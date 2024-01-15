import { Product } from "../models/product";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("seller_info");
    res.json({ state: true, products: products });
  } catch (error) {
    console.log("Get Products Error : ", error);
  }
};

// 현재 유저의 세션에서 받아옴
// 토큰의 _id를 통해 user 찾기
// 미들웨어에서 액세스토큰을 갱신 후 갱신 된 액세스토큰을 사용하려고 했으나 불가능 한듯 (비동기 호출 순서가 잘못 됐나?)
// 그래서 그냥 refreshToken을 사용하여 이메일로 사용자 찾기
export const postUpload = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const payload = await jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: payload.email });

    if (!user) {
      return res.status(400).json({ err: "찾을 수 없는 사용자" });
    }

    const product = new Product({ ...req.body, seller_info: user });
    user["on_sale"].push(product);
    await product.save();
    await user.save();

    res.status(200).json({ state: true, status: "상품 업로드 성공" });
  } catch (error) {
    console.error("상품 업로드 중 에러 발생:", error);

    return res.status(500).json({ error: "상품 업로드 중 에러가 발생했습니다." });
  }
};

export const getProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  const product = await Product.findById(id).populate("seller_info");

  res.status(200).json({ state: true, product });
};

export const postEdit = async (req, res) => {
  const {
    params: { id },
  } = req;

  await Product.findByIdAndUpdate(id, { ...req.body });

  res.json({ state: true });
};

export const deleteProduct = async (req, res) => {
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
};
