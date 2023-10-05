import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  social_id: {
    value: Schema.Types.Mixed,
    social_name: { type: String },
  },
  nickname: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
  },
  email: {
    type: String,
  },
  // 판매 중인 상품들
  products_on_sale: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
  },
  chat_room: {
    type: [Schema.Types.ObjectId],
    ref: "Chat",
  },
});

export const User = mongoose.model("User", userSchema);
