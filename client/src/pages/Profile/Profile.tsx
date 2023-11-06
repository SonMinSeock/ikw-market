import React, { useEffect, useId } from "react";
import * as S from "./Profile.style";
import Product from "../../components/atoms/Product/Product";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";
import { ProductsLayout } from "../Main/ProductList/ProductList.style";
import { useNavigate } from "react-router-dom";

// interface IProduct {
//   description: string;
//   location: string;
//   product_images: any;
//   product_name: string;
//   product_price: string;
//   seller_info: any;
//   __v: number;
//   _id: string;
// }

const Profile = () => {
  const userInfo = useRecoilValue(userAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, []);

  const products = userInfo?.products_on_sale;

  return (
    <S.ProfileLayout>
      <S.UserHeader>
        <S.UserImg src="https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png" />
        <S.UserInfoBox>
          <S.UserNameSpan>{userInfo?.nickname}</S.UserNameSpan>
          <S.UserUpdateBtn>프로필 수정</S.UserUpdateBtn>
        </S.UserInfoBox>
      </S.UserHeader>
      <S.UserProductList>
        <S.UserProductTitle>
          <span>내가 올린 물건</span>
        </S.UserProductTitle>
        <ProductsLayout>
          {products?.map((product, idx) => {
            return <Product key={idx} product={product} />;
          })}
        </ProductsLayout>
      </S.UserProductList>
    </S.ProfileLayout>
  );
};

export default Profile;
