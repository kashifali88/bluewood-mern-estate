import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
