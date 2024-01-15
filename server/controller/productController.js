import { Product } from "../models/product";
import { User } from "../models/user";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("seller_info");
    res.json({ state: true, products: products });
  } catch (error) {
    console.log("Get Products Error : ", error);
  }
};

export const postUpload = async (req, res) => {
  const user = await User.findOne({ social_id: req.session.user["social_id"] });

  const product = new Product({ ...req.body, seller_info: user });
  user["on_sale"].push(product);
  await product.save();
  await user.save();

  res.json({ state: true });
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
