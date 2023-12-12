import React from "react";
import Text from "../../components/common/atoms/Text";
import UploadForm from "./organism/UploadForm";
import styled from "styled-components";

export const UploadLayout = styled.main`
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 40px;
  width: 680px;
  margin: 0 auto;
  gap: 10px;
  @media screen and (max-width: 860px) {
    width: 100vw;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Upload = () => {
  return (
    <UploadLayout>
      <Text style={{ fontSize: "23px", margin: "0 0 10px 0", padding: "18px 0px 10px 0px;" }}>상품 등록</Text>
      <UploadForm />
    </UploadLayout>
  );
};

export default Upload;
