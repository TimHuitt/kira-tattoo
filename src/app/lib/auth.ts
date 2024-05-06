import type { NextAuthOptions } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user}) {
      const isAuthorized = user.email === 'timhuitt@gmail.com';
      if (!isAuthorized) {
        return false
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async redirect() {
      return '/'
    }
  }
}