import React from "react";
import * as S from "./Main.style";
import Product from "../../components/Product/Product";
interface IProduct {
  img: string;
  name: string;
  price: number;
  location: string;
}
const Main = () => {
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
    <S.MainLayout>
      <S.MainTitle>최근 중고거래 매물</S.MainTitle>
      <S.MainSection>
        {products.map((product, idx) => {
          return <Product key={idx} {...product} />;
        })}
      </S.MainSection>
    </S.MainLayout>
  );
};

export default Main;
