import React, { useEffect, useState } from "react";
import * as S from "./ProfileUpdate.style";
import Product from "../../../components/atoms/Product/Product";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../../recoil/login/atoms";
import { ProductsLayout } from "../../Main/ProductList/ProductList.style";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateUser } from "../../../api/userData";

const ProfileUpdate = () => {
  const userInfo = useRecoilValue(userAtom);
  const isLogin = useRecoilValue(isLoginAtom);

  const [enteredNickname, setEnteredNickname] = useState(userInfo.nickname);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) navigate("/login");

    if (userInfo._id !== "") {
      setEnteredNickname(userInfo.nickname);
    }
  }, [userInfo]);

  const products = [...userInfo?.on_sale].reverse();

  const { mutate: mutateUpdateUser } = useMutation(
    ({ userId, nickname }: { userId: string; nickname: string }) => updateUser({ userId, nickname }),
    {
      onSuccess: () => navigate("/profile"),
    }
  );

  const onNicknameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEnteredNickname(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enteredNickname.trim() === "") return;

    mutateUpdateUser({ userId: userInfo._id, nickname: enteredNickname });
  };

  return (
    <S.ProfileUpdateLayout>
      <S.UserHeader>
        <div>
          <S.UserImg src={userInfo?.image} />
        </div>

        <S.ProfileUpdateForm onSubmit={onSubmit}>
          <S.UserInfoBox>
            <S.UserNameInput onChange={onNicknameInput} value={enteredNickname} placeholder="닉네임" />
            <S.UserUpdateBtn>프로필 수정 하기</S.UserUpdateBtn>
          </S.UserInfoBox>
        </S.ProfileUpdateForm>
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
    </S.ProfileUpdateLayout>
  );
};

export default ProfileUpdate;
