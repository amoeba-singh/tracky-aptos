import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "./lib/database/connection";
import UserModel from "./lib/database/models/user-model";
import Points from "./lib/database/models/points-model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await dbConnect();

        const { name, email, image } = user;

        // Check if the user already exists
        let existingUser = await UserModel.findOne({ email });

        // If not, create a new user
        if (!existingUser) {
          existingUser = new UserModel({
            name,
            email,
            image,
          });
          await existingUser.save();

          const point_details = new Points({
            user: existingUser._id,
            points: 0,
          });

          await point_details.save();
        }

        // Add the MongoDB ObjectId to the token payload
        account.userId = existingUser._id.toString();

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in sign-in:", error);
        return false; // Reject sign-in
      }
    },

    async session({ session, token }) {
      // Attach MongoDB user ID to the session
      await dbConnect();

      const user_from_db = await UserModel.findOne({
        email: session.user.email,
      });

      if (user_from_db) {
        session.user.id = user_from_db._id;
      }
      return session;
    },
  },
});
