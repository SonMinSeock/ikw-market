import express from "express";
import { tokenCheckMiddleWare } from "../controller/tokenController";
import { userInfo, edit } from "../controller/userController";

const router = express.Router();

router.all("/", tokenCheckMiddleWare);
router.get("/", userInfo);
router.post("/edit", edit);
export default router;
