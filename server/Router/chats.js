import express from "express";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Chat } from "../models/chat";
import { currentDate } from "../lib/date";

const router = express.Router();

router.post("/:productId", async (req, res) => {
  const sessionUser = req.session.user;
  const { productId } = req.params;
  const product = await Product.findById(productId).populate("seller_info");

  const sellerUser = await User.findById(product.seller_info._id).populate("chat_room");
  const user = await User.findOne({ social_id: sessionUser["social_id"] }).populate("chat_room");

  const chatRoom = { title: product.product_name, created_at: currentDate() };

  let isChat = false;

  // 판매자 채팅방 참여하고 있는지 확인해주는 부분.
  for (let x = 0; x < sellerUser.chat_room.length; x++) {
    for (let y = 0; y < user.chat_room.length; y++) {
      if (sellerUser.chat_room[x].product.equals(user.chat_room[y].product)) {
        isChat = true;
        break;
      }
    }
    if (isChat) break;
  }

  if (!isChat) {
    const createdChatRoom = new Chat({
      title: chatRoom.title,
      message_log: [],
      product,
      created_at: chatRoom.created_at,
    });

    sellerUser.chat_room.push(createdChatRoom);
    user.chat_room.push(createdChatRoom);
    await createdChatRoom.save();
    await sellerUser.save();
    await user.save();
  }

  res.json({ state: true });
});
export default router;
