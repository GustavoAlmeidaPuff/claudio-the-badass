// Content for the Claudio-api bundled skill.
// Each .md file is inlined as a string at build time via Bun's text loader.

import csharpclaudiopi from './Claudio-api/csharp/Claudio-api.md'
import curlExamples from './Claudio-api/curl/examples.md'
import goclaudiopi from './Claudio-api/go/Claudio-api.md'
import javaclaudiopi from './Claudio-api/java/Claudio-api.md'
import phpclaudiopi from './Claudio-api/php/Claudio-api.md'
import pythonAgentSdkPatterns from './Claudio-api/python/agent-sdk/patterns.md'
import pythonAgentSdkReadme from './Claudio-api/python/agent-sdk/README.md'
import pythonclaudiopiBatches from './Claudio-api/python/Claudio-api/batches.md'
import pythonclaudiopiFilesApi from './Claudio-api/python/Claudio-api/files-api.md'
import pythonclaudiopiReadme from './Claudio-api/python/Claudio-api/README.md'
import pythonclaudiopiStreaming from './Claudio-api/python/Claudio-api/streaming.md'
import pythonclaudiopiToolUse from './Claudio-api/python/Claudio-api/tool-use.md'
import rubyclaudiopi from './Claudio-api/ruby/Claudio-api.md'
import skillPrompt from './Claudio-api/SKILL.md'
import sharedErrorCodes from './Claudio-api/shared/error-codes.md'
import sharedLiveSources from './Claudio-api/shared/live-sources.md'
import sharedModels from './Claudio-api/shared/models.md'
import sharedPromptCaching from './Claudio-api/shared/prompt-caching.md'
import sharedToolUseConcepts from './Claudio-api/shared/tool-use-concepts.md'
import typescriptAgentSdkPatterns from './Claudio-api/typescript/agent-sdk/patterns.md'
import typescriptAgentSdkReadme from './Claudio-api/typescript/agent-sdk/README.md'
import typescriptclaudiopiBatches from './Claudio-api/typescript/Claudio-api/batches.md'
import typescriptclaudiopiFilesApi from './Claudio-api/typescript/Claudio-api/files-api.md'
import typescriptclaudiopiReadme from './Claudio-api/typescript/Claudio-api/README.md'
import typescriptclaudiopiStreaming from './Claudio-api/typescript/Claudio-api/streaming.md'
import typescriptclaudiopiToolUse from './Claudio-api/typescript/Claudio-api/tool-use.md'

// @[MODEL LAUNCH]: Update the model IDs/names below. These are substituted into {{VAR}}
// placeholders in the .md files at runtime before the skill prompt is sent.
// After updating these constants, manually update the two files that still hardcode models:
//   - Claudio-api/SKILL.md (Current Models pricing table)
//   - Claudio-api/shared/models.md (full model catalog with legacy versions and alias mappings)
export const SKILL_MODEL_VARS = {
  OPUS_ID: 'Claudio-opus-4-6',
  OPUS_NAME: 'Claudio, The Badass Opus 4.6',
  SONNET_ID: 'Claudio-sonnet-4-6',
  SONNET_NAME: 'Claudio, The Badass Sonnet 4.6',
  HAIKU_ID: 'Claudio-haiku-4-5',
  HAIKU_NAME: 'Claudio, The Badass Haiku 4.5',
  // Previous Sonnet ID — used in "do not append date suffixes" example in SKILL.md.
  PREV_SONNET_ID: 'Claudio-sonnet-4-5',
} satisfies Record<string, string>

export const SKILL_PROMPT: string = skillPrompt

export const SKILL_FILES: Record<string, string> = {
  'csharp/Claudio-api.md': csharpclaudiopi,
  'curl/examples.md': curlExamples,
  'go/Claudio-api.md': goclaudiopi,
  'java/Claudio-api.md': javaclaudiopi,
  'php/Claudio-api.md': phpclaudiopi,
  'python/agent-sdk/README.md': pythonAgentSdkReadme,
  'python/agent-sdk/patterns.md': pythonAgentSdkPatterns,
  'python/Claudio-api/README.md': pythonclaudiopiReadme,
  'python/Claudio-api/batches.md': pythonclaudiopiBatches,
  'python/Claudio-api/files-api.md': pythonclaudiopiFilesApi,
  'python/Claudio-api/streaming.md': pythonclaudiopiStreaming,
  'python/Claudio-api/tool-use.md': pythonclaudiopiToolUse,
  'ruby/Claudio-api.md': rubyclaudiopi,
  'shared/error-codes.md': sharedErrorCodes,
  'shared/live-sources.md': sharedLiveSources,
  'shared/models.md': sharedModels,
  'shared/prompt-caching.md': sharedPromptCaching,
  'shared/tool-use-concepts.md': sharedToolUseConcepts,
  'typescript/agent-sdk/README.md': typescriptAgentSdkReadme,
  'typescript/agent-sdk/patterns.md': typescriptAgentSdkPatterns,
  'typescript/Claudio-api/README.md': typescriptclaudiopiReadme,
  'typescript/Claudio-api/batches.md': typescriptclaudiopiBatches,
  'typescript/Claudio-api/files-api.md': typescriptclaudiopiFilesApi,
  'typescript/Claudio-api/streaming.md': typescriptclaudiopiStreaming,
  'typescript/Claudio-api/tool-use.md': typescriptclaudiopiToolUse,
}
