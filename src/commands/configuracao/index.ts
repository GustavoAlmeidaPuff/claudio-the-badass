import type { Command } from '../../commands.js'

const configuracao = {
  type: 'local-jsx',
  name: 'configuracao',
  description: 'Editar provider, modelo, API key e reiniciar',
  userFacingName() {
    return 'configuracao'
  },
  load: () => import('./configuracao.js'),
} satisfies Command

export default configuracao
