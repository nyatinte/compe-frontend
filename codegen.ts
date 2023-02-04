import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/graphql' : '/api/graphql',
  documents: 'src/**/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo', // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-apollo
        // 'typed-document-node', // https://the-guild.dev/graphql/codegen/plugins/typed-document-node
      ],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
    // スキーマを生成するとき
    'src/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
}

export default config
