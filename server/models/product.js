import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
  // 상품 이름
  name: {
    type: String,
    required: true,
  },
  // 상품 이미지들
  images: {
    type: [String],
  },
  price: {
    type: String,
    required: true,
  },
  // 상품 상태 -> 판매 상태 값 즉 판매 했으면 true 값이고 안했으면 false이다.
  state: {
    type: Boolean,
  },
  // 거래위치
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // 판매자 정보
  seller_info: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
