import express from "express";
import { tokenCheckMiddleWare } from "../controller/tokenController";
import { getProducts, postUpload, getProduct, postEdit, deleteProduct } from "../controller/productController";

const router = express.Router();

router.get("/", getProducts);
router.post("/upload", tokenCheckMiddleWare, postUpload);
router.get("/:id", tokenCheckMiddleWare, getProduct);
router.post("/:id/edit", tokenCheckMiddleWare, postEdit);
router.delete("/:id/delete", tokenCheckMiddleWare, deleteProduct);

export default router;
