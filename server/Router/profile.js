import express from "express";
import { User } from "../models/user";
import { tokenCheckMiddleWare } from "../token";
import { userInfo } from "../controller/userController";

const router = express.Router();

router.all("/", tokenCheckMiddleWare);
router.get("/", userInfo);
router.post("/edit", async (req, res) => {
  try {
    const {
      params: { userId },
      body: { nickname },
    } = req;

    const updateData = { nickname };

    await User.findByIdAndUpdate(userId, updateData);

    return res.json({ state: true });
  } catch (error) {
    console.log("Error Update Profile : ", error);
  }
});
export default router;
