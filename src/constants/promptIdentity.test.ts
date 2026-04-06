import { afterEach, expect, test } from 'bun:test'

import { getSystemPrompt, DEFAULT_AGENT_PROMPT } from './prompts.js'
import { CLI_SYSPROMPT_PREFIXES, getCLISyspromptPrefix } from './system.js'
import { GENERAL_PURPOSE_AGENT } from '../tools/AgentTool/built-in/generalPurposeAgent.js'
import { EXPLORE_AGENT } from '../tools/AgentTool/built-in/exploreAgent.js'

const originalSimpleEnv = process.env.CLAUDIO_THE_BADASS_SIMPLE

afterEach(() => {
  process.env.CLAUDIO_THE_BADASS_SIMPLE = originalSimpleEnv
})

test('CLI identity prefixes describe Claudio, The Badass instead of Claudio, The Badass', () => {
  expect(getCLISyspromptPrefix()).toContain('Claudio, The Badass')
  expect(getCLISyspromptPrefix()).not.toContain("Anthropic's official CLI for Claudio")

  for (const prefix of CLI_SYSPROMPT_PREFIXES) {
    expect(prefix).toContain('Claudio, The Badass')
    expect(prefix).not.toContain("Anthropic's official CLI for Claudio")
  }
})

test('simple mode identity describes Claudio, The Badass instead of Claudio, The Badass', async () => {
  process.env.CLAUDIO_THE_BADASS_SIMPLE = '1'

  const prompt = await getSystemPrompt([], 'gpt-4o')

  expect(prompt[0]).toContain('Claudio, The Badass')
  expect(prompt[0]).not.toContain("Anthropic's official CLI for Claudio")
})

test('built-in agent prompts describe Claudio, The Badass instead of Claudio, The Badass', () => {
  expect(DEFAULT_AGENT_PROMPT).toContain('Claudio, The Badass')
  expect(DEFAULT_AGENT_PROMPT).not.toContain("Anthropic's official CLI for Claudio")

  const generalPrompt = GENERAL_PURPOSE_AGENT.getSystemPrompt({
    toolUseContext: { options: {} as never },
  })
  expect(generalPrompt).toContain('Claudio, The Badass')
  expect(generalPrompt).not.toContain("Anthropic's official CLI for Claudio")

  const explorePrompt = EXPLORE_AGENT.getSystemPrompt({
    toolUseContext: { options: {} as never },
  })
  expect(explorePrompt).toContain('Claudio, The Badass')
  expect(explorePrompt).not.toContain("Anthropic's official CLI for Claudio")
})
