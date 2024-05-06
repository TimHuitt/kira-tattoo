import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from "next-auth/providers/credentials";
// import { has, compare } from 'bcryptjs'

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    
  ],
}


// CredentialsProvider({
//   name: "Email",
//   credentials: {
//     email: { label: "Email", type: "text" },
//     password: { label: "Password", type: "password" }
//   },
//   async authorize(credentials, req) {
//     const client = await MongoClient.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
// 
//     const collection = client.db().collection('users')
// 
//     const user = await collection.findOne({
//       email: credentials.email
//     })
// 
//     if (!user) {
//       client.close()
//       throw new Error('User Not Found')
//     }
// 
//     const isValid = await compare(credentials.password, user.password)
// 
//     if (!isValid) {
//       client.close()
//       throw new Error('Log In Error')
//     }
// 
//     client.close()
//     return { email: user.email }
//     }
// })