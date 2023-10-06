import express from "express";
import { User } from "../models/user";
const router = express.Router();

router.post("/login", async (req, res) => {
  req.session.user = req.body;
  const isUser = await User.findOne({ social_id: req.body["social_id"] });

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
  if (req.session.user) {
    res.json({ state: true, user: req.session.user });
  } else {
    res.json({ state: false });
  }
});

export default router;
