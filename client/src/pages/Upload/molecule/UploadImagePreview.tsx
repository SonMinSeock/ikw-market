import React from "react";
import styled from "styled-components";
import Image from "../../../components/common/atoms/Image";
import { TiDelete } from "react-icons/ti";

type Props = {
  image: string;
  onDelete: () => void;
};

const imageStyle = {
  flex: "0 0 auto",
  borderRadius: "10px",
  width: "200px",
  height: "200px",
  objectFit: "cover",
};

const UploadImagesLayout = styled.div`
  /* display: flex; */
  position: relative;
  margin-right: 10px;
  svg {
    cursor: pointer;
    position: absolute;
    top: -14px;
    right: -13px;
  }
`;

const UploadImagePreview = ({ image, onDelete }: Props) => {
  return (
    <UploadImagesLayout>
      <Image style={imageStyle} src={image} alt="이미지" />
      <TiDelete onClick={() => onDelete()} fill="fill" size={35} />
    </UploadImagesLayout>
  );
};

export default UploadImagePreview;
