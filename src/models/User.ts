import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import Post from "./Post";

export interface IUser extends Document {
  username: string;
  name: string;
  password: string;
  admin: boolean;
  favoriteNft: string[];
  likes: string[];
  posts: IPost[];
}

interface IPost {
  post: string;
  expireAt: Date;
}

const postSchema = new mongoose.Schema<IPost>({
  post: { type: String, required: true },
  expireAt: {
    type: Date,
    index: { expireAfterSeconds: 60 },
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  admin: { type: Boolean, default: false },
  favoriteNft: { type: [String], default: [] },
  likes: { type: [String], default: [] },
  posts: { type: [postSchema], default: [] },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password!, 5);
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
