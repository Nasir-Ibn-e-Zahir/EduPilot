// Next-Auth
import { NextAuthOptions } from "next-auth";
// Allows login using email or username + password
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma DataBase
import { db } from "@/lib/db";
// Used to Hash the Password
import { comparePasswords } from "@/lib/hash";


//  Extends the NextAuth session type to include user.id
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

// Configures a custom credentials-based login system using email/username and password
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Fields expected in Login Form
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Authenticates user by verifying email/username and password from the database
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;
        // Check the user in the database
        const user = await db.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              {name: credentials.identifier },
            ],
          },
        });
        
        if (!user) throw new Error("User not found");

        const isValid = await comparePasswords(credentials.password, user.password);
        
        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
      
  pages: {
    signIn: "/sign-in",
  },
  // Use JWT tokens for sessions and attach user.id to both token and session for easy access
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
