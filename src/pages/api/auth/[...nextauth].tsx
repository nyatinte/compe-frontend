import { client } from '@/client/apollo'
import { CreateNewUserDocument, CreateNewUserMutation, GetUserDocument } from '@/generated/graphql'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env['GITHUB_ID'] as string,
      clientSecret: process.env['GITHUB_SECRET'] as string,
    }),
  ],
  callbacks: {
    // 型を上書きする @link src/types/next-auth.d.ts
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
        session.accessToken = token
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
    signIn: async ({ user }) => {
      const res = await client.query({
        query: GetUserDocument,
        variables: {
          id: user.id,
        },
      })
      if (res.data.user) {
        return true
      }
      try {
        await client.mutate<CreateNewUserMutation>({
          mutation: CreateNewUserDocument,
          variables: {
            id: user.id,
            input: {
              name: user.name || user.email,
              email: user.email,
            },
          },
        })
      } catch (e) {
        console.error(e)
        return false
      }

      return true
    },
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
})
