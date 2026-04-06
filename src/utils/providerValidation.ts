import {
  isLocalProviderUrl,
  resolveCodexApiCredentials,
  resolveProviderRequest,
} from '../services/api/providerConfig.js'
import {
  type GeminiResolvedCredential,
  resolveGeminiCredential,
} from './geminiAuth.js'
import { redactSecretValueForDisplay } from './providerProfile.js'

function isEnvTruthy(value: string | undefined): boolean {
  if (!value) return false
  const normalized = value.trim().toLowerCase()
  return normalized !== '' && normalized !== '0' && normalized !== 'false' && normalized !== 'no'
}

function isPlaceholderOpenaiApiKey(value: string | undefined): boolean {
  const t = value?.trim()
  if (!t) return false
  if (t === 'SUA_CHAVE') return true
  if (t.toLowerCase() === 'sk-sua-chave-aqui') return true
  return false
}

export async function getProviderValidationError(
  env: NodeJS.ProcessEnv = process.env,
  options?: {
    resolveGeminiCredential?: (
      env: NodeJS.ProcessEnv,
    ) => Promise<GeminiResolvedCredential>
  },
): Promise<string | null> {
  const useOpenAI = isEnvTruthy(env.CLAUDIO_THE_BADASS_USE_OPENAI)
  const useGithub = isEnvTruthy(env.CLAUDIO_THE_BADASS_USE_GITHUB)

  if (isEnvTruthy(env.CLAUDIO_THE_BADASS_USE_GEMINI)) {
    const geminiCredential = await (
      options?.resolveGeminiCredential ?? resolveGeminiCredential
    )(env)
    if (geminiCredential.kind === 'none') {
      return 'GEMINI_API_KEY, GOOGLE_API_KEY, GEMINI_ACCESS_TOKEN, or Google ADC credentials are required when CLAUDIO_THE_BADASS_USE_GEMINI=1.'
    }
    return null
  }

  if (useGithub && !useOpenAI) {
    const token = (env.GITHUB_TOKEN?.trim() || env.GH_TOKEN?.trim()) ?? ''
    if (!token) {
      return 'GITHUB_TOKEN or GH_TOKEN is required when CLAUDIO_THE_BADASS_USE_GITHUB=1.'
    }
    return null
  }

  if (!useOpenAI) {
    return null
  }

  const request = resolveProviderRequest({
    model: env.OPENAI_MODEL,
    baseUrl: env.OPENAI_BASE_URL,
  })

  if (isPlaceholderOpenaiApiKey(env.OPENAI_API_KEY)) {
    return 'Invalid OPENAI_API_KEY: placeholder value detected. Set a real key via environment variables (recommended) or edit your profile JSON; do not commit keys.'
  }

  if (request.transport === 'codex_responses') {
    const credentials = resolveCodexApiCredentials(env)
    if (!credentials.apiKey) {
      const authHint = credentials.authPath
        ? ` or put auth.json at ${credentials.authPath}`
        : ''
      const safeModel =
        redactSecretValueForDisplay(request.requestedModel, env) ??
        'the requested model'
      return `Codex auth is required for ${safeModel}. Set CODEX_API_KEY${authHint}.`
    }
    if (!credentials.accountId) {
      return 'Codex auth is missing chatgpt_account_id. Re-login with Codex or set CHATGPT_ACCOUNT_ID/CODEX_ACCOUNT_ID.'
    }
    return null
  }

  if (!env.OPENAI_API_KEY && !isLocalProviderUrl(request.baseUrl)) {
    const hasGithubToken = !!(env.GITHUB_TOKEN?.trim() || env.GH_TOKEN?.trim())
    if (useGithub && hasGithubToken) {
      return null
    }
    return 'OPENAI_API_KEY is required when CLAUDIO_THE_BADASS_USE_OPENAI=1 and OPENAI_BASE_URL is not local.'
  }

  return null
}

export async function validateProviderEnvOrExit(
  env: NodeJS.ProcessEnv = process.env,
): Promise<void> {
  const error = await getProviderValidationError(env)
  if (error) {
    console.error(error)
    process.exit(1)
  }
}
