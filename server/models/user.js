import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  social_id: {
    value: Schema.Types.Mixed,
    social_name: { type: String },
  },
  nickname: {
    type: String,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
  },
  // 판매 중인 상품들.
  on_sale: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
  },
  // 채팅방 리스트.
  // 채팅하기 클릭시, 판매자 유저와  소비자 유저 동시에 채팅방 리스트에서 생성해야 한다.
  chat_rooms: {
    type: [Schema.Types.ObjectId],
    ref: "Chat",
  },
});

export const User = mongoose.model("User", userSchema);
