import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/common/atoms/Button";
import Input from "../../../components/common/atoms/Input";
import { BiImageAdd } from "react-icons/bi";
import UploadImagePreview from "./UploadImagePreview";

const UploadImageInputLayout = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 20px;
  padding-top: 10px;
  @media screen and (max-width: 500px) {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const UploadImageInput = () => {
  // const [fileList, setFileList] = useState<string[]>([]); // 파일 URL을 저장하는 배열로 선언

  const fileList = [
    "https://ikw-market-image.s3.ap-northeast-2.amazonaws.com/1701686436454.0.webp",
    "https://ikw-market-image.s3.ap-northeast-2.amazonaws.com/1701686436454.0.webp",
  ];
  const uploadImgInput = useRef() as any;

  const onClickButton = () => {
    if (fileList.length > 2) {
      alert("사진은 최대 3개까지 첨부할 수 있습니다");
    } else {
      uploadImgInput.current.click();
    }
  };

  return (
    <UploadImageInputLayout>
      <Input ref={uploadImgInput} style={{ display: "none" }} type="file" accept="image/jpg, image/jpeg, image/png" />
      <Button
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          color: "grey",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "200px",
          height: "200px",
          flex: "0 0 auto",
        }}
        type="button"
        onClick={onClickButton}>
        <BiImageAdd size={50} />
        상품 이미지 등록
      </Button>
      <UploadImagePreview images={fileList} />
    </UploadImageInputLayout>
  );
};

export default UploadImageInput;
