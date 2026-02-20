import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    seenBy: [{ type: mongoose.Schema.Types.ObjectId }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    lastMessage: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);
