import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  // 채팅방 타이틀.
  // 채팅하기 버튼 클릭할시, 해당상품 이름으로 채팅방 타이틀로 생성한다.
  title: {
    type: String,
    required: true,
  },
  // 채팅 보낸 기록들.
  message_log: [
    {
      // 채팅 보낸 유저.
      send_user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      message: {
        type: String,
      },
      // 채팅 한 날짜.
      send_date: {
        type: String,
      },
      // 채팅 메시지 읽음 상태 확인 할 필드.
      // is_read_message: {
      //   type: Boolean,
      //   default: false,
      // },
    },
  ],

  // 소비자 필드.
  member: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  // 판매자 정보. 호스트라고 생각하면됨.
  seller_user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  // 채팅방 만든 날짜.
  created_at: {
    type: String,
  },
});

export const Chat = mongoose.model("Chat", chatSchema);
