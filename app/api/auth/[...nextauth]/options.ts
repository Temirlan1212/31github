import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession, NextAuthOptions } from "next-auth";
import { IUserCredentials } from "@/models/user/user";
import connectToDb from "@/lib/mongoose";
import User from "@/lib/models/user.model";
import bcrypt from "bcrypt";
import { getServerMessageKey } from "@/helpers/server-messages";
import { setNewError } from "@/helpers/common";

declare module "next-auth" {
  interface User extends IUserCredentials {
    role?: string | null;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      username?: string | null;
      role?: string | null;
    } & DefaultSession["user"];
  }
}

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { password, email } = credentials as any;
        await connectToDb();

        try {
          const user: any = await User.findOne({ email });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (isPasswordCorrect) {
              return user;
            } else {
              setNewError(JSON.stringify({ password: getServerMessageKey("wrongPassword") }));
            }
          } else {
            setNewError(JSON.stringify({ email: getServerMessageKey("userNotFound") }));
          }
        } catch (error) {
          setNewError(error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.role = user.role ?? "";
      }

      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      session.user = token;
      return Promise.resolve(session);
    },
  },
  session: {
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/signin",
  },
};
