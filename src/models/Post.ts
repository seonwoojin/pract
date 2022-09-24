import mongoose, { Document } from "mongoose";

interface IPost extends Document {
  user: string;
  post: string;
  expireAt: Date;
}

const postSchema = new mongoose.Schema<IPost>({
  user: { type: String, required: true },
  post: { type: String, required: true },
  expireAt: {
    type: Date,
    index: { expireAfterSeconds: 3600 },
    default: Date.now,
  },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
