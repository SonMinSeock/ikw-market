import { useEffect } from "react";
import * as S from "./ProfileUpdate.style";
import Product from "../../../components/atoms/Product/Product";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../../recoil/login/atoms";
import { ProductsLayout } from "../../Main/ProductList/ProductList.style";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { updateUser } from "../../../api/userData";
import { useForm } from "react-hook-form";

interface IProfileForm {
  nickname: string;
}

const ProfileUpdate = () => {
  const NICKNAME = "nickname";

  const { register, handleSubmit, setValue, getValues } = useForm<IProfileForm>();
  const userInfo = useRecoilValue(userAtom);
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const products = [...userInfo?.on_sale].reverse();

  useEffect(() => {
    if (isLogin === false) navigate("/login");

    if (userInfo._id !== "") {
      setValue(NICKNAME, userInfo.nickname);
    }
  }, [userInfo]);

  const { mutate: mutateUpdateUser } = useMutation(
    ({ userId, nickname }: { userId: string; nickname: string }) => updateUser({ userId, nickname }),
    {
      onSuccess: () => navigate("/profile"),
    }
  );

  const onValid = async (data: IProfileForm) => {
    const nickname = data.nickname.trim();

    setValue(NICKNAME, nickname);

    mutateUpdateUser({ userId: userInfo._id, nickname });
  };

  const getNickname = () => getValues(NICKNAME);

  return (
    <S.ProfileUpdateLayout>
      <S.UserHeader>
        <div>
          <S.UserImg src={userInfo?.image} />
        </div>
        <S.ProfileUpdateForm onSubmit={handleSubmit(onValid)}>
          <S.UserInfoBox>
            <S.UserNameInput
              {...register(NICKNAME, { required: true, minLength: 4, maxLength: 20 })}
              value={getNickname()}
              placeholder="닉네임"
              maxLength={20}
            />
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
