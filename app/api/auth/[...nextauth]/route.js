import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import User from "@/models/User.js"
import dbConnect from '@/db/connectDB.js';

export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret:process.env.GITHUB_SECRET
    }),
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider === 'github'){
        //conncet to db
        await dbConnect();
        const currentUser = await User.findOne({email:user.email})
        if(!currentUser){
          //create new user
          const newUser = await User.create({
            email:user.email,
            username:user.email.split("@")[0],
            profileUpdated:false
          });
        }
      }
      return true
    },
    async session({ session, user, token }) {
        await dbConnect();
        const dbUser = await User.findOne({email:session.user.email})
        session.user.username = dbUser.username
        session.user.profileUpdated = dbUser.profileUpdated
        return session
    },
  },
  
})

export { authoptions as GET, authoptions as POST }