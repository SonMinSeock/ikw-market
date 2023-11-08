import * as S from "./ProductDetail.style";
import { useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import Slider from "../../components/Animation/Slider/Slider";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/login/atoms";
import Sold from "../../components/atoms/Product/Sold/Sold";
import { useMutation } from "react-query";
import { deleteProduct, updateProduct } from "../../api/productData";
import { createdChatRoom } from "../../api/chatData";

interface IProduct {
  description: string;
  img: string;
  location: string;
  name: string;
  price: string;
  images: [];
  state: boolean;
  seller_info: any;
  __v: number;
  _id: object;
}
const ProductDetail = () => {
  const userInfo = useRecoilValue(userAtom);

  const navigate = useNavigate();
  const location = useLocation();

  const product: IProduct = location.state;

  const productId = product?._id;
  const userId = userInfo?._id;
  const productSellerId = product.seller_info._id;

  const { mutate: mutateCreatedChatRoom } = useMutation({
    mutationFn: () => createdChatRoom({ productId }),
    onSuccess: ({ state }) => {
      if (!state) {
        navigate("/login");
      }
    },
  });

  const onRedirectChat = async () => {
    mutateCreatedChatRoom();
    await navigate("/chat");
  };

  const onRedirectProductEdit = (product: IProduct) => {
    return navigate("edit", { state: product });
  };

  const deleteProductMutaion = useMutation((id: any) => deleteProduct(id), {
    onSuccess: () => {
      navigate("/");
    },
  });
  const updateProductMutaion = useMutation((id: any) => updateProduct(id), {
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <S.ProductDetailBox>
      <S.ProductDetailLayout>
        <S.ProductDetailImgbox>
          <Slider images={product.images} />
          {product.state && <Sold />}
        </S.ProductDetailImgbox>
        <S.ProductDetailProfileBox>
          <CgProfile size={28} />
          <S.ProductDetailText>{product?.seller_info.nickname}</S.ProductDetailText>
        </S.ProductDetailProfileBox>
        <S.ProductDetailInfoBox>
          <S.ProductDetailName>{product?.name}</S.ProductDetailName>
          <S.ProductDetailInfoText>{product?.price}원</S.ProductDetailInfoText>
          <S.ProductDetailLocationBox>
            <CiLocationOn size={20} />
            <S.ProductDetailText>{product?.location}</S.ProductDetailText>
          </S.ProductDetailLocationBox>
          <S.ProductDetailInfoParagraph>{product?.description}</S.ProductDetailInfoParagraph>
        </S.ProductDetailInfoBox>
        {userId === productSellerId ? (
          <S.ButtonRow>
            <S.ProductDetailBtn onClick={() => onRedirectProductEdit(product)}>수정하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={() => deleteProductMutaion.mutate(product._id)}>삭제하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={() => updateProductMutaion.mutate(product._id)}>판매완료</S.ProductDetailBtn>
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
