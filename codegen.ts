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
      config: {
        useTypeImports: true,
      },
    },
    //  introspectionを作成する
    // './graphql.schema.json': {
    //   plugins: ['introspection'],
    // },
    // Zodスキーマを生成する
    'src/generated/validate.ts': {
      plugins: ['typescript', 'typescript-validation-schema'],
      config: {
        strictScalars: true,
        schema: 'zod',
        enumAsTypes: true,
        scalarSchemas: {
          DateTime: 'z.string().datetime()',
          Date: 'z.string().datetime()',
          EmailAddress: 'z.string().email()',
          URL: 'z.string().url()',
        },
        overwrite: true,
      },
    },
    // GraphQLスキーマを生成する
    'src/generated/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
  // graphql-scalarsを使う場合はここで指定する
  config: {
    scalars: {
      DateTime: 'string',
      Date: 'string',
      EmailAddress: 'string',
      URL: 'string',
    },
  },
}

export default config
