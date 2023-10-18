import express from "express";
import { Product } from "../models/product";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ state: true, products: products });
  } catch (error) {
    console.log("Get Products Error : ", error);
  }
});

router.post("/upload", async (req, res) => {
  const user = await User.findOne({ social_id: req.session.user["social_id"] });

  const product = new Product({ ...req.body, seller_info: user });
  user["products_on_sale"].push(product);
  await product.save();
  await user.save();
  res.json({ state: true });
});

export default router;
