import * as S from "./ProductDetail.style";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import Slider from "../../components/Animation/Slider/Slider";
import { useRecoilState } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
import axios from "axios";
import Sold from "../../components/atoms/Sold/Sold";

interface IProduct {
  description: string;
  img: string;
  location: string;
  name: string;
  price: string;
  product_images: [];
  product_name: string;
  product_price: string;
  product_state: boolean;
  seller_info: any;
  __v: number;
  _id: object;
}
const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product: IProduct = location.state;
  const [user, setUser] = useRecoilState(userAtom);
  const createdChatAPI = async () => {
    const { state, user } = await (
      await axios.post(`http://localhost:3002/chats/${product._id}`, {}, { withCredentials: true })
    ).data;

    setUser(user);
    if (!state) {
      navigate("/login");
    }
  };
  const onRedirectChat = async () => {
    await createdChatAPI();
    await navigate("/chat");
  };
  const onRedirectProductEdit = (product: IProduct) => {
    return navigate("edit", { state: product });
  };

  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const userId = userInfo?._id;
  const productSellerId = product.seller_info._id;

  const deleteProductAPI = async (id: any) => {
    const { state, updateUser } = await (
      await axios.delete(`http://localhost:3002/product/${id}/delete`, { withCredentials: true })
    ).data;

    if (state) {
      setUserInfo(updateUser);
      navigate("/");
    }
  };

  const updateProductAPI = async (id: any) => {
    const { state } = await (
      await axios.post(`http://localhost:3002/product/${id}/update`, { product_state: true }, { withCredentials: true })
    ).data;

    if (state) navigate("/");
  };
  return (
    <S.ProductDetailBox>
      <S.ProductDetailLayout>
        <S.ProductDetailImgbox>
          <Slider images={product.product_images} />
          {product.product_state && <Sold />}
        </S.ProductDetailImgbox>
        <S.ProductDetailProfileBox>
          <CgProfile size={28} />
          <S.ProductDetailText>{product?.seller_info.nickname}</S.ProductDetailText>
        </S.ProductDetailProfileBox>
        <S.ProductDetailInfoBox>
          <S.ProductDetailName>{product?.product_name}</S.ProductDetailName>
          <S.ProductDetailInfoText>{product?.product_price}원</S.ProductDetailInfoText>
          <S.ProductDetailLocationBox>
            <CiLocationOn size={20} />
            <S.ProductDetailText>{product?.location}</S.ProductDetailText>
          </S.ProductDetailLocationBox>
          <S.ProductDetailInfoParagraph>{product?.description}</S.ProductDetailInfoParagraph>
          <S.ProductDetailViewBox>
            {/* <S.ProductDetailText>조회수</S.ProductDetailText>
            <S.ProductDetailText>123123</S.ProductDetailText> */}
          </S.ProductDetailViewBox>
        </S.ProductDetailInfoBox>
        {userId === productSellerId ? (
          <S.ButtonRow>
            <S.ProductDetailBtn onClick={() => onRedirectProductEdit(product)}>수정하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={() => deleteProductAPI(product._id)}>삭제하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={() => updateProductAPI(product._id)}>판매완료</S.ProductDetailBtn>
          </S.ButtonRow>
        ) : (
          <S.ButtonRow>
            <S.ProductDetailBtn onClick={onRedirectChat}>채팅하기</S.ProductDetailBtn>
          </S.ButtonRow>
        )}
      </S.ProductDetailLayout>
    </S.ProductDetailBox>
  );
};

export default ProductDetail;
