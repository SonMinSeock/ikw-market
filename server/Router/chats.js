import express from "express";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Chat } from "../models/chat";
import { currentDate } from "../lib/date";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("chat_room");
    const chatRoom = user.chat_room;
    return res.json({ state: true, chatRoom });
  } catch (err) {
    console.log("Read Chat Room Error : ", err);
  }
});

router.post("/:productId", async (req, res) => {
  try {
    const sessionUser = req.session.user;
    if (sessionUser) {
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
          seller_user: sellerUser,
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
    } else {
      res.json({ state: false });
    }
  } catch (err) {
    console.log("Error Created Chat API : ", err);
  }
});

router.post("/:productId/chat/:chatId", async (req, res) => {
  try {
    const {
      params: { productId, chatId },
      body: { message_log },
    } = req; // message_log 배열 형식.

    const chat = await Chat.findById(chatId);

    chat.message_log.push(...message_log);

    await chat.save();

    res.json({ state: true });
  } catch (err) {
    console.log("Error Message Log Push API : ", err);
  }
});

router.post("/write", async (req, res) => {
  try {
    const {
      query: { chatId },
      body: { message_log },
    } = req; // message_log 배열 형식.

    const chat = await Chat.findById(chatId);

    chat.message_log.push(...message_log);

    await chat.save();

    res.json({ state: true });
  } catch (err) {
    console.log("Error Message Log Push API : ", err);
  }
});

export default router;
