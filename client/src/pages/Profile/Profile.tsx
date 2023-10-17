import React, { useId } from "react";
import * as S from "./Profile.style";
import Product from "../../components/atoms/Product/Product";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
import { ProductsLayout } from "../../components/ProductList/ProductList.style";

interface IProduct {
  img: string;
  name: string;
  price: number;
  location: string;
}

const Profile = () => {
  const userInfo = useRecoilValue(userAtom);
  const products: IProduct[] = [
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
    {
      img: "https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png",
      name: "의자팝니다",
      price: 100000,
      location: "2호관",
    },
  ];

  return (
    <S.ProfileLayout>
      <S.UserHeader>
        <S.UserImg src="https://velog.velcdn.com/images/phjjj/post/012efe6b-b8d3-4c3a-968e-b0ce258801e6/image.png" />
        <S.UserInfoBox>
          <S.UserNameSpan>나는박해준</S.UserNameSpan>
          <S.UserUpdateBtn>프로필 수정</S.UserUpdateBtn>
        </S.UserInfoBox>
      </S.UserHeader>
      <S.UserProductList>
        <S.UserProductTitle>
          <span>내가 올린 물건</span>
        </S.UserProductTitle>
        <ProductsLayout>
          {products.map((product, idx) => {
            return <Product key={idx} {...product} index={idx} />;
          })}
        </ProductsLayout>
      </S.UserProductList>
    </S.ProfileLayout>
  );
};

export default Profile;
