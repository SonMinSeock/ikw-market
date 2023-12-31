import express from "express";
import { User } from "../models/user";
const router = express.Router();

router.post("/:userId/update", async (req, res) => {
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
