import { afterEach, expect, test } from 'bun:test'

import { resetModelStringsForTestingOnly } from '../../bootstrap/state.js'
import { parseUserSpecifiedModel } from './model.js'
import { getModelStrings } from './modelStrings.js'

const originalEnv = {
  CLAUDIO_THE_BADASS_USE_GITHUB: process.env.CLAUDIO_THE_BADASS_USE_GITHUB,
  CLAUDIO_THE_BADASS_USE_OPENAI: process.env.CLAUDIO_THE_BADASS_USE_OPENAI,
  CLAUDIO_THE_BADASS_USE_GEMINI: process.env.CLAUDIO_THE_BADASS_USE_GEMINI,
  CLAUDIO_THE_BADASS_USE_BEDROCK: process.env.CLAUDIO_THE_BADASS_USE_BEDROCK,
  CLAUDIO_THE_BADASS_USE_VERTEX: process.env.CLAUDIO_THE_BADASS_USE_VERTEX,
  CLAUDIO_THE_BADASS_USE_FOUNDRY: process.env.CLAUDIO_THE_BADASS_USE_FOUNDRY,
}

function clearProviderFlags(): void {
  delete process.env.CLAUDIO_THE_BADASS_USE_GITHUB
  delete process.env.CLAUDIO_THE_BADASS_USE_OPENAI
  delete process.env.CLAUDIO_THE_BADASS_USE_GEMINI
  delete process.env.CLAUDIO_THE_BADASS_USE_BEDROCK
  delete process.env.CLAUDIO_THE_BADASS_USE_VERTEX
  delete process.env.CLAUDIO_THE_BADASS_USE_FOUNDRY
}

afterEach(() => {
  process.env.CLAUDIO_THE_BADASS_USE_GITHUB = originalEnv.CLAUDIO_THE_BADASS_USE_GITHUB
  process.env.CLAUDIO_THE_BADASS_USE_OPENAI = originalEnv.CLAUDIO_THE_BADASS_USE_OPENAI
  process.env.CLAUDIO_THE_BADASS_USE_GEMINI = originalEnv.CLAUDIO_THE_BADASS_USE_GEMINI
  process.env.CLAUDIO_THE_BADASS_USE_BEDROCK = originalEnv.CLAUDIO_THE_BADASS_USE_BEDROCK
  process.env.CLAUDIO_THE_BADASS_USE_VERTEX = originalEnv.CLAUDIO_THE_BADASS_USE_VERTEX
  process.env.CLAUDIO_THE_BADASS_USE_FOUNDRY = originalEnv.CLAUDIO_THE_BADASS_USE_FOUNDRY
  resetModelStringsForTestingOnly()
})

test('GitHub provider model strings are concrete IDs', () => {
  clearProviderFlags()
  process.env.CLAUDIO_THE_BADASS_USE_GITHUB = '1'

  const modelStrings = getModelStrings()

  for (const value of Object.values(modelStrings)) {
    expect(typeof value).toBe('string')
    expect(value.trim().length).toBeGreaterThan(0)
  }
})

test('GitHub provider model strings are safe to parse', () => {
  clearProviderFlags()
  process.env.CLAUDIO_THE_BADASS_USE_GITHUB = '1'

  const modelStrings = getModelStrings()

  expect(() => parseUserSpecifiedModel(modelStrings.sonnet46 as any)).not.toThrow()
})
