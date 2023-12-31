import express from "express";
import { User } from "../models/user";
import kakaoAuth from "../utils/kakaoAuth";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { access_token } = req.body;
    let kakaoUser;
    let sendUser;
    let responseData;

    if (access_token) {
      // 초기 로그인.
      const result = await kakaoAuth.getProfile(access_token);

      const user = result;
      kakaoUser = {
        social_id: { value: user.id, social_name: "카카오 로그인" },
        email: user.kakao_account.email,
        nickname: user.kakao_account.profile.nickname,
        image: user.kakao_account.profile.profile_image_url,
      };

      const isUser = await User.findOne({ email: kakaoUser.email })
        .populate({
          path: "on_sale",
          populate: { path: "seller_info" },
        })
        .populate({ path: "chat_rooms", populate: { path: "message_log", populate: { path: "send_user" } } })
        .populate({ path: "chat_rooms", populate: { path: "member_list" } })
        .populate({ path: "chat_rooms", populate: { path: "product" } });

      if (!isUser) {
        sendUser = new User(kakaoUser);
        await sendUser.save();
      } else {
        sendUser = isUser;
      }

      responseData = { success: true, user: sendUser };

      if (access_token) {
        const token = jwt.sign(
          {
            _id: sendUser._id,
            social_id: { ...sendUser.social_id },
          },
          process.env.JWT_SECRET_KEY
        );

        responseData.jwt = token;
      }

      req.session.user = sendUser;
      req.session.save();
      return res.status(201).json(responseData);
    } else if (req.headers.authorization) {
      // 자동 로그인.
      const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, {
        ignoreExpiration: true,
      });

      const isUser = await User.findById(user._id)
        .populate({
          path: "on_sale",
          populate: { path: "seller_info" },
        })
        .populate({ path: "chat_rooms", populate: { path: "message_log", populate: { path: "send_user" } } })
        .populate({ path: "chat_rooms", populate: { path: "member_list" } })
        .populate({ path: "chat_rooms", populate: { path: "product" } });
      req.session.user = isUser;
      req.session.save();
      responseData = { success: true, user: isUser };

      return res.json(responseData);
    } else {
      responseData = { success: true, user: null };
      return res.status(200).json(responseData);
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.toString(),
    });
  }
});

router.get("/logout", async (req, res) => {
  let session = req.session;
  if (session.user) {
    session.destroy();
  }
  res.end();
});

export default router;
