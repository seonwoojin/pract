import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  name: string;
  password: string;
  admin: boolean;
  favoriteNft: string[];
  likes: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  admin: { type: Boolean, default: false },
  favoriteNft: { type: [String], default: [] },
  likes: { type: [String], default: [] },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password!, 5);
  }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
