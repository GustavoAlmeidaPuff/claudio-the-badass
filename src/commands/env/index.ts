import type { Command } from '../../commands.js'

const env = {
  type: 'local-jsx',
  name: 'env',
  description: 'Edit provider, model, API key and restart',
  userFacingName() {
    return 'env'
  },
  load: () => import('./env.js'),
} satisfies Command

export default env
