import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connect from "./dbConnect/dbConnect";
import userModel from "./models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {label: "Username", type: "text"},
        password: {label: "Password", type: "password"},
      },
      authorize: async (credentials: any) => {
        try {
          await connect();
          const { username, password } = credentials;

          const user = await userModel.findOne({ username });

          if (!user) {
            throw new Error("User does not exist");
      
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }

          const isPasswordCorrect = await bcrypt.compare(password, user.password);

          if (!isPasswordCorrect) {
            throw new Error("Invalid Credentials");
          }
          
          // console.log(user);
          return user;
        } catch (error: any) {
          throw new Error("Authorization Failed. Error:", error);
          // console.error("Error in authorization:", error.message);
          // throw new Error(error.message || "Failed to authorize");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin"
  },

  callbacks: {
    async jwt({token, user}) { 
      if(user) {
        token._id = user?._id?.toString();
        token.username = user?.username;
      }
      return token;
  },
  async session({session, token}) {
    if(token) {
      session.user._id = token?._id;
      session.user.username = token?.username;
    }
    return session;
  }
},
  secret: process.env.NEXTAUTH_SECRET
};
