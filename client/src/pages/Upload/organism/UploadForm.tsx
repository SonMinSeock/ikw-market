import React from "react";
import styled from "styled-components";
import InputGroup from "../../../components/common/molecules/InputGroup";
import Button from "../../../components/common/atoms/Button";
import { useInput } from "../../../hooks/useInput";
import UploadImage from "../molecule/UploadImage";

const UploadFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #000;
`;

const textareaStyle = {
  display: "flex",
  resize: "none",
  borderRadius: "10px",
  height: "240px",
  border: "1px solid rgb(204, 204, 204)",
  padding: "1rem",
};

const inputStyle = {
  height: "42px",
  borderRadius: "10px",
  border: "1px solid rgb(204, 204, 204)",
  width: "100%",
  padding: "0px 1rem",
};

const buttonStyle = {
  width: "150px",
  height: "50px",
  backgroundColor: "#ffaa22",
  borderRadius: "14px",
  border: "1px solid #ffaa22",
  cursor: "pointer",
  color: "#ffffff",
  fontFamily: "Arial, GmarketSansMedium", // 여러 폰트 지정 가능
  fontSize: "18px",
  padding: "6px 28px",
  textDecoration: "none",
  margin: "0 auto",
};

const UploadForm = ({ product }: any) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { value: name, onInput: onInputName, length: nameLength } = useInput(product?.name || "", 20, false);
  const { value: price, onInput: onInputPrice, length: priceLength } = useInput(product?.price || "", 11, true);
  const {
    value: location,
    onInput: onInputLocation,
    length: locationLength,
  } = useInput(product?.location || "", 10, false);
  const {
    value: description,
    onInput: onInputDescription,
    length: descriptionLength,
  } = useInput(product?.description || "", 300, false);

  return (
    <UploadFormLayout onSubmit={onSubmit}>
      <UploadImage />
      <InputGroup
        name={name}
        label="제목"
        value={name}
        onInput={onInputName}
        placeholder="상품명을 입력해주세요. 20자 이내"
        length={`${nameLength}/20`}
        style={inputStyle}
      />
      <InputGroup
        name="가격"
        label="가격"
        value={price}
        onInput={onInputPrice}
        inputMode="numeric"
        style={inputStyle}
      />
      <InputGroup
        name={location}
        label="거래위치"
        value={location}
        onInput={onInputLocation}
        placeholder="거래장소를 입력해주세요. ex) 운동장.."
        length={`${locationLength}/10`}
        style={inputStyle}
      />
      <InputGroup
        useTextArea={true}
        name={description}
        label="상품설명"
        value={description}
        onInput={onInputDescription}
        placeholder="구매시기, 제품상태, 하자 유무 등 물건 상태에 대한 정확한 설명을 작성해주세요. 10자 이상 300자 내"
        length={`${descriptionLength}/300`}
        style={textareaStyle}
      />
      <Button style={buttonStyle}>등록하기</Button>
    </UploadFormLayout>
  );
};

export default UploadForm;
