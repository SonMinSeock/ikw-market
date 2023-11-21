import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Product.style";
import Sold from "./Sold/Sold";
import { IProduct } from "../../../types/productType";
import { useMutation } from "react-query";
import { deleteProduct, updateProduct } from "../../../api/productData";

const Product = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onRedirect = (url = "") => {
    return navigate(url, { state: { ...product } });
  };

  const onRedirectProductEdit = (product: IProduct) => {
    return navigate(`/product/${product._id}/edit`, { state: product });
  };

  const deleteProductMutaion = useMutation((id: string) => deleteProduct(id), {
    onSuccess: () => {
      navigate("/");
    },
  });
  const updateProductMutaion = useMutation((id: string) => updateProduct(id), {
    onSuccess: () => {
      navigate("/");
    },
  });

  return (
    <S.ProductLayout>
      <S.ProductImgBox>
        {/* <S.ProductImg src={product.images[0]} type="thumbnail" /> */}
        <S.ProductImg
          src={"https://thumbs.dreamstime.com/b/stack-books-isolated-white-background-34637153.jpg"}
          type="thumbnail"
          onClick={() => onRedirect(`/product/${product?._id}`)}
        />
        {product.state && <Sold product={product} onRedirect={onRedirect} />}
        <S.ProductInfoBox onClick={() => onRedirect(`/product/${product?._id}`)}>
          <S.ProductTitle>{product.name}</S.ProductTitle>
          <S.ProductPriceSpan>{product.price}원</S.ProductPriceSpan>
          <S.ProductLocationSpan>{product.location}</S.ProductLocationSpan>
        </S.ProductInfoBox>
        {location.pathname === "/profile" ? (
          <S.ButtonRow>
            <S.ProductDetailBtn onClick={() => onRedirectProductEdit(product)}>수정하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={() => deleteProductMutaion.mutate(product._id)}>삭제하기</S.ProductDetailBtn>
            <S.ProductDetailBtn onClick={() => updateProductMutaion.mutate(product._id)}>판매완료</S.ProductDetailBtn>
          </S.ButtonRow>
        ) : null}
      </S.ProductImgBox>
    </S.ProductLayout>
  );
};

export default Product;
