import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'production' ? '/api/graphql' : 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})
