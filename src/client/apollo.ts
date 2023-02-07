import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getSession } from 'next-auth/react'

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? '/api/graphql' : 'http://localhost:4000/graphql',
})

const authLink = setContext(async (_, { headers }) => {
  try {
    const session = await getSession()
    const authorization = session?.user.token ? `Bearer ${session.user.token}` : ''

    return {
      headers: {
        ...headers,
        authorization,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      headers,
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
