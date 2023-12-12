import { useEffect } from "react";
import * as S from "./Profile.style";
import Product from "../../components/atoms/Product/Product";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";
import { ProductsLayout } from "../Main/@Main/ProductList/ProductList.style";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const userInfo = useRecoilValue(userAtom);
  const isLogin = useRecoilValue(isLoginAtom);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, [isLogin]);

  const products = isLogin ? [...userInfo?.on_sale]?.reverse() : [];

  const onNavigate = () => navigate("/profile/update");

  return (
    <S.ProfileLayout>
      <S.UserHeader>
        <div>
          <S.UserImg src={userInfo?.image} />
        </div>
        <S.UserInfoBox>
          <S.UserNameSpan>{userInfo?.nickname}</S.UserNameSpan>
          <S.UserUpdateBtn onClick={onNavigate}>프로필 수정</S.UserUpdateBtn>
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
