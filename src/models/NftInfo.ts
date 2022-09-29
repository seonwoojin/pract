import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  chain: { type: String, required: true },
  nft: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  description: { type: String, required: true },
  SNS: { type: String, required: true },
  createdAt: { type: String, required: true },
  likes: { type: [String], default: [] },
  unlikes: { type: [String], default: [] },
  hashTags: { type: [String] },
  text: { type: String },
});

const NftInfo = mongoose.model("NftInfo", nftSchema);

export default NftInfo;
