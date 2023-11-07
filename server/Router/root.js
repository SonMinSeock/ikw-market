import express from "express";
import { User } from "../models/user";
const router = express.Router();

router.post("/login", async (req, res) => {
  req.session.user = req.body;
  const isUser = await User.findOne({ social_id: req.body["social_id"] });
  req.session.save();
  if (!isUser) {
    const user = new User(req.body);

    await user.save();
  }
  res.end();
});

router.get("/login", async (req, res) => {
  if (req.session.user) {
    res.json({ state: true, user: req.session.user });
  } else {
    res.json({ state: false });
  }
});

router.get("/getUser", async (req, res) => {
  const sessionUser = req.session.user;

  if (req.session.user) {
    const user = await User.findOne({ social_id: sessionUser["social_id"] })
      .populate({
        path: "products_on_sale",
        populate: { path: "seller_info" },
      })
      .populate({ path: "chat_room", populate: { path: "message_log", populate: { path: "send_user" } } })
      .populate({ path: "chat_room", populate: { path: "consumer", populate: { path: "user" } } })
      .populate({ path: "chat_room", populate: { path: "seller", populate: { path: "user" } } });

    if (sessionUser["social_id"]["social_name"] === "카카오 로그인") {
      res.json({ state: true, user, accessToken: sessionUser["access_token"] });
    } else {
      res.json({ state: true, user });
    }
  } else {
    res.json({ state: false });
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
