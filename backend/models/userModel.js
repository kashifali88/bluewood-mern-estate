import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  chatIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
});

export default mongoose.model("User", UserSchema); 

