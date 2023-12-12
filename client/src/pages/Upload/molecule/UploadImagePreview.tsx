import React from "react";
import styled from "styled-components";
import Image from "../../../components/common/atoms/Image";
import { TiDelete } from "react-icons/ti";

type Props = {
  images: string[];
};

const imageStyle = {
  flex: "0 0 auto",
  borderRadius: "10px",
  width: "200px",
  height: "200px",
  objectFit: "cover",
};

const Layout = styled.div``;

const UploadImagesLayout = styled.div`
  display: flex;
  position: relative;

  svg {
    cursor: pointer;
    position: absolute;
    top: -14px;
    right: -13px;
  }
`;
const UploadImagePreview = ({ images }: Props) => {
  return (
    <>
      {images.map((image, idx) => (
        <UploadImagesLayout>
          <Image style={imageStyle} key={idx} src={image} alt="이미지" />
          <TiDelete fill="fill" size={35} />
        </UploadImagesLayout>
      ))}
    </>
  );
};

export default UploadImagePreview;
