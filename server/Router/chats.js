import express from "express";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Chat } from "../models/chat";
import { currentDate } from "../lib/date";

const router = express.Router();

router.get("/:chatId", async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId).populate({
      path: "message_log",
      populate: {
        path: "send_user",
      },
    });

    return res.json({ state: true, chatRoom: chat });
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

      const sellerUser = await User.findById(product.seller_info._id).populate({
        path: "chat_rooms",
        populate: {
          path: "message_log",
          populate: {
            path: "send_user",
          },
        },
      });
      const user = await User.findOne({ social_id: sessionUser["social_id"] }).populate({
        path: "chat_rooms",
        populate: {
          path: "message_log",
          populate: {
            path: "send_user",
          },
        },
      });

      const created_at = currentDate();
      const send_date = currentDate("sendDate");

      const chatRoom = { title: product.name, created_at: created_at };

      let isChat = false;

      // 판매자 채팅방 참여하고 있는지 확인해주는 부분.
      for (let x = 0; x < user.chat_rooms.length; x++) {
        if (user.chat_rooms[x].product.equals(productId)) {
          isChat = true;
          break;
        }
      }

      if (!isChat) {
        const firstMessageTemplate = {
          send_user: user,
          message: `안녕하세요, ${user.nickname}이라고 합니다. 업로드한 매물에 관심을 가지고 연락 드렸습니다.`,
          send_date,
        };

        const createdChatRoom = new Chat({
          title: chatRoom.title,
          message_log: [firstMessageTemplate],
          member_list: [sellerUser, user],
          product,
          created_at: chatRoom.created_at,
        });

        sellerUser.chat_rooms.push(createdChatRoom);
        user.chat_rooms.push(createdChatRoom);

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

router.post("/chat/:chatId", async (req, res) => {
  try {
    const {
      params: { productId, chatId },
      body: { message },
    } = req;

    const chat = await Chat.findById(chatId);

    chat.message_log.push(message);

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
