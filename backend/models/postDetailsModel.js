import mongoose from "mongoose";

const PostDetailSchema = new mongoose.Schema({
  desc: { type: String, required: true },
  utilities: { type: String },
  pet: { type: String },
  income: { type: String },
  size: { type: Number },
  school: { type: Number },
  bus: { type: Number },
  restaurant: { type: Number },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", unique: true },
});

export default mongoose.model("PostDetail", PostDetailSchema);
