import { useEffect } from "react";
import * as S from "./Profile.style";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUser } from "../../api/userData";

const Profile = () => {
  const isLogin = useRecoilValue(isLoginAtom);

  const navigate = useNavigate();

  // api 요청으로 수정 하기
  const { isLoading, data: user } = useQuery(["User"], getUser, {
    staleTime: 3000,
    refetchInterval: 200000,
    refetchIntervalInBackground: true,
  });

  const onNavigate = () => navigate("/profile/update");

  return (
    <S.ProfileLayout>
      <S.UserHeader>
        <div>
          <S.UserImg src={user?.image} />
        </div>
        <S.UserInfoBox>
          <S.UserNameSpan>{user?.nickname}</S.UserNameSpan>
          <S.UserUpdateBtn onClick={onNavigate}>프로필 수정</S.UserUpdateBtn>
        </S.UserInfoBox>
      </S.UserHeader>
      <S.UserProductList>
        <S.UserProductTitle>
          <span>내가 올린 물건</span>
        </S.UserProductTitle>
        {/* <ProductsLayout>
          {products?.map((product, idx) => {
            return <Product key={idx} product={product} />;
          })}
        </ProductsLayout> */}
      </S.UserProductList>
    </S.ProfileLayout>
  );
};

export default Profile;
