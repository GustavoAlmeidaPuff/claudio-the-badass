import { afterEach, expect, test } from 'bun:test'

const originalEnv = {
  CLAUDIO_THE_BADASS_USE_GEMINI: process.env.CLAUDIO_THE_BADASS_USE_GEMINI,
  CLAUDIO_THE_BADASS_USE_GITHUB: process.env.CLAUDIO_THE_BADASS_USE_GITHUB,
  CLAUDIO_THE_BADASS_USE_OPENAI: process.env.CLAUDIO_THE_BADASS_USE_OPENAI,
  CLAUDIO_THE_BADASS_USE_BEDROCK: process.env.CLAUDIO_THE_BADASS_USE_BEDROCK,
  CLAUDIO_THE_BADASS_USE_VERTEX: process.env.CLAUDIO_THE_BADASS_USE_VERTEX,
  CLAUDIO_THE_BADASS_USE_FOUNDRY: process.env.CLAUDIO_THE_BADASS_USE_FOUNDRY,
  OPENAI_BASE_URL: process.env.OPENAI_BASE_URL,
  OPENAI_API_BASE: process.env.OPENAI_API_BASE,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
}

afterEach(() => {
  process.env.CLAUDIO_THE_BADASS_USE_GEMINI = originalEnv.CLAUDIO_THE_BADASS_USE_GEMINI
  process.env.CLAUDIO_THE_BADASS_USE_GITHUB = originalEnv.CLAUDIO_THE_BADASS_USE_GITHUB
  process.env.CLAUDIO_THE_BADASS_USE_OPENAI = originalEnv.CLAUDIO_THE_BADASS_USE_OPENAI
  process.env.CLAUDIO_THE_BADASS_USE_BEDROCK = originalEnv.CLAUDIO_THE_BADASS_USE_BEDROCK
  process.env.CLAUDIO_THE_BADASS_USE_VERTEX = originalEnv.CLAUDIO_THE_BADASS_USE_VERTEX
  process.env.CLAUDIO_THE_BADASS_USE_FOUNDRY = originalEnv.CLAUDIO_THE_BADASS_USE_FOUNDRY
  process.env.OPENAI_BASE_URL = originalEnv.OPENAI_BASE_URL
  process.env.OPENAI_API_BASE = originalEnv.OPENAI_API_BASE
  process.env.OPENAI_MODEL = originalEnv.OPENAI_MODEL
})

async function importFreshProvidersModule() {
  return import(`./providers.js?ts=${Date.now()}-${Math.random()}`)
}

function clearProviderEnv(): void {
  delete process.env.CLAUDIO_THE_BADASS_USE_GEMINI
  delete process.env.CLAUDIO_THE_BADASS_USE_GITHUB
  delete process.env.CLAUDIO_THE_BADASS_USE_OPENAI
  delete process.env.CLAUDIO_THE_BADASS_USE_BEDROCK
  delete process.env.CLAUDIO_THE_BADASS_USE_VERTEX
  delete process.env.CLAUDIO_THE_BADASS_USE_FOUNDRY
  delete process.env.OPENAI_BASE_URL
  delete process.env.OPENAI_API_BASE
  delete process.env.OPENAI_MODEL
}

test('first-party provider keeps Anthropic account setup flow enabled', () => {
  clearProviderEnv()
  return importFreshProvidersModule().then(
    ({ getAPIProvider, usesAnthropicAccountFlow }) => {
      expect(getAPIProvider()).toBe('firstParty')
      expect(usesAnthropicAccountFlow()).toBe(true)
    },
  )
})

test.each([
  ['CLAUDIO_THE_BADASS_USE_OPENAI', 'openai'],
  ['CLAUDIO_THE_BADASS_USE_GITHUB', 'github'],
  ['CLAUDIO_THE_BADASS_USE_GEMINI', 'gemini'],
  ['CLAUDIO_THE_BADASS_USE_BEDROCK', 'bedrock'],
  ['CLAUDIO_THE_BADASS_USE_VERTEX', 'vertex'],
  ['CLAUDIO_THE_BADASS_USE_FOUNDRY', 'foundry'],
] as const)(
  '%s disables Anthropic account setup flow',
  async (envKey, provider) => {
    clearProviderEnv()
    process.env[envKey] = '1'
    const { getAPIProvider, usesAnthropicAccountFlow } =
      await importFreshProvidersModule()

    expect(getAPIProvider()).toBe(provider)
    expect(usesAnthropicAccountFlow()).toBe(false)
  },
)

test('GEMINI takes precedence over GitHub when both are set', async () => {
  clearProviderEnv()
  process.env.CLAUDIO_THE_BADASS_USE_GEMINI = '1'
  process.env.CLAUDIO_THE_BADASS_USE_GITHUB = '1'
  const { getAPIProvider } = await importFreshProvidersModule()

  expect(getAPIProvider()).toBe('gemini')
})

test('explicit local openai-compatible base URLs stay on the openai provider', async () => {
  clearProviderEnv()
  process.env.CLAUDIO_THE_BADASS_USE_OPENAI = '1'
  process.env.OPENAI_BASE_URL = 'http://127.0.0.1:8080/v1'
  process.env.OPENAI_MODEL = 'gpt-5.4'

  const { getAPIProvider } = await importFreshProvidersModule()
  expect(getAPIProvider()).toBe('openai')
})

test('codex aliases still resolve to the codex provider without a non-codex base URL', async () => {
  clearProviderEnv()
  process.env.CLAUDIO_THE_BADASS_USE_OPENAI = '1'
  process.env.OPENAI_MODEL = 'codexplan'

  const { getAPIProvider } = await importFreshProvidersModule()
  expect(getAPIProvider()).toBe('codex')
})

test('official OpenAI base URLs now keep provider detection on openai for aliases', async () => {
  clearProviderEnv()
  process.env.CLAUDIO_THE_BADASS_USE_OPENAI = '1'
  process.env.OPENAI_BASE_URL = 'https://api.openai.com/v1'
  process.env.OPENAI_MODEL = 'gpt-5.4'

  const { getAPIProvider } = await importFreshProvidersModule()
  expect(getAPIProvider()).toBe('openai')
})
