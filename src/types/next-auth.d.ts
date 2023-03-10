// @see https://zenn.dev/nrikiji/articles/d37393da5ae9bc#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3%E3%82%92%E4%BD%BF%E3%81%86

import { DefaultSession } from 'next-auth'
import { JWT as NextAuthJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      token?: string
    } & DefaultSession['user']
    accessToken?: string
  }
  interface JWT {
    id?: string
    accessToken?: string
  }
  interface Profile {
    id?: string
    accessToken?: string
  }
}
