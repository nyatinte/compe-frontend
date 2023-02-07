import { client } from '@/client/apollo'
import { CreateNewUserDocument, CreateNewUserMutation, GetUserDocument } from '@/generated/graphql'
import NextAuth from 'next-auth'
import { encode } from 'next-auth/jwt'
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
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token['id'] as string
      }
      session.accessToken = token['accessToken'] as string
      session.user.token = await encode({
        token,
        secret: process.env['NEXTAUTH_SECRET'] as string,
      })
      return session
    },
    jwt({ token, account, profile, user }) {
      if (user) {
        token.sub = user.id
      }
      if (account) {
        token['accessToken'] = account.access_token
        token['id'] = profile?.id
      }
      return token
    },
    signIn: async ({ user }) => {
      // throwしたエラーはURLクエリパラメーターに渡される
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
            id: String(user.id),
            input: {
              name: user.name || user.email,
              email: user.email,
              image: user.image,
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
  // ターミナルにログを出力する
  debug: process.env.NODE_ENV === 'development',
})
