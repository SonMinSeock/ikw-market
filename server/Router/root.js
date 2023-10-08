import express from "express";
import { User } from "../models/user";
const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(req.body);

  const isUser = await User.findOne({ social_id: req.body["social_id"] });

  console.log("find query isUser : ", isUser);
  if (!isUser) {
    const user = new User(req.body);
    await user.save();
  }
  res.end();
});

export default router;
