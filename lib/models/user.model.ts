import mongoose from "mongoose";

const userShema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userShema);

export default User;
