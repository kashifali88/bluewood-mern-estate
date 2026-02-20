import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    address: { type: String, required: true },
    city: { type: String, required: true },
    bedroom: { type: Number, required: true },
    bathroom: { type: Number, required: true },
    latitude: { type: String },
    longitude: { type: String },
    type: { type: String, enum: ["buy", "rent"], required: true },
    property: {
      type: String,
      enum: ["apartment", "house", "condo", "land"],
      required: true,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId,        
      ref: "User",
      required: true,
    },
    postDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostDetail", 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
