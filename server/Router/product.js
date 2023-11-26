import express from "express";
import { Product } from "../models/product";
import { User } from "../models/user";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).populate("seller_info");
    res.json({ state: true, products: products });
  } catch (error) {
    console.log("Get Products Error : ", error);
  }
});

router.post("/upload", async (req, res) => {
  const user = await User.findOne({ social_id: req.session.user["social_id"] });

  const product = new Product({ ...req.body, seller_info: user });
  user["on_sale"].push(product);
  await product.save();
  await user.save();

  res.json({ state: true });
});

router.get("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findById(id);

  res.json({ state: true, product });
});

// 해당 상품 수정해주는 API
router.post("/:id/update", async (req, res) => {
  const {
    params: { id },
  } = req;

  await Product.findByIdAndUpdate(id, { ...req.body });

  res.json({ state: true });
});

router.delete("/:id/delete", async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const deleteProduct = await Product.findByIdAndDelete(id);

    // 유저가 등록한 상품리스트를 삭제해준다.
    await User.findByIdAndUpdate(
      deleteProduct.seller_info._id,
      {
        $pull: { on_sale: { $in: [id] } },
      },
      { new: true }
    );

    res.json({ state: true });
  } catch (error) {
    console.log("Delete Product Error : ", error);
  }
});

export default router;
