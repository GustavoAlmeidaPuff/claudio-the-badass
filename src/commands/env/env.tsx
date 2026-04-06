import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawn, spawnSync } from 'node:child_process'

import type { LocalJSXCommandCall } from '../../types/command.js'

const DEFAULT_CONFIG = {
  profile: 'openai',
  env: {
    CLAUDIO_THE_BADASS_USE_OPENAI: '1',
    OPENAI_BASE_URL: 'https://openrouter.ai/api/v1',
    OPENAI_MODEL: 'qwen/qwen3-6b:free',
    OPENAI_API_KEY: 'sk-sua-chave-aqui',
  },
  createdAt: new Date().toISOString(),
}

export const call: LocalJSXCommandCall = async (onDone, _context, _args) => {
  const profilePath = resolve(
    process.env['USERPROFILE'] ?? process.env['HOME'] ?? '.',
    '.Claudio-the-badass-profile.json',
  )

  // Sempre escreve o que está rodando agora antes de abrir
  const current = {
    profile: 'openai',
    env: {
      CLAUDIO_THE_BADASS_USE_OPENAI: '1',
      OPENAI_BASE_URL:
        process.env['OPENAI_BASE_URL'] ?? DEFAULT_CONFIG.env.OPENAI_BASE_URL,
      OPENAI_MODEL:
        process.env['OPENAI_MODEL'] ?? DEFAULT_CONFIG.env.OPENAI_MODEL,
      OPENAI_API_KEY:
        process.env['OPENAI_API_KEY'] ?? DEFAULT_CONFIG.env.OPENAI_API_KEY,
    },
    createdAt: new Date().toISOString(),
  }

  writeFileSync(profilePath, JSON.stringify(current, null, 2), 'utf8')

  onDone(
    `Abrindo ${profilePath} no Notepad...\nSalve o arquivo, feche o Notepad e o Claudio, The Badass vai reiniciar com as novas configuracoes.`,
    { display: 'system' },
  )

  // Abre Notepad e aguarda fechar
  spawnSync('notepad.exe', [profilePath], { stdio: 'inherit' })

  // Lê o perfil atualizado e reinicia com as novas variáveis de ambiente
  let updatedEnv = { ...process.env }
  try {
    if (existsSync(profilePath)) {
      const profile = JSON.parse(readFileSync(profilePath, 'utf8'))
      if (profile.env) {
        updatedEnv = { ...updatedEnv, ...profile.env }
      }
    }
  } catch {}

  const child = spawn(process.execPath, process.argv.slice(1), {
    env: updatedEnv,
    stdio: 'inherit',
    detached: false,
  })
  child.unref()

  setTimeout(() => process.exit(0), 200)

  return null
}
