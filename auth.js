//auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { connectToDB } from "./lib/connectDB";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
        async authorize(credentials) {
        await connectToDB();

        const { email, password } = credentials;

        // Find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        // Return user object
        return { 
          id: user._id.toString(), 
          email: user.email, 
          username: user.username , 
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username; // Ensure consistency
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username, // Ensure consistency
        role: token.role,
      };
      return session;
    },
    async redirect({ baseUrl, token }) {
      // Use token.role for redirect
      if (token?.role === "admin") return "/admin";
      if (token?.role === "user") return "/dashboard";
      if (token?.role === "writer") return "/writer";
      return baseUrl;
    }
  },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
