import React, { useRef } from "react";
import * as S from "./Upload.style";
import { BiImageAdd } from "react-icons/bi";
const Upload = () => {
  const uploadImgInput = useRef() as any;
  const onClickImgBtn = () => {
    uploadImgInput.current.click();
  };
  return (
    <S.UploadLayout>
      <S.UploadTitle>상품 등록</S.UploadTitle>
      <S.UploadImgBox>
        <S.UploadImgList>
          <S.UploadImgInput ref={uploadImgInput} type="file" accept="image/jpg, image/jpeg, image/png" multiple />
          <S.UploadImgBtn onClick={onClickImgBtn}>
            <BiImageAdd size={50} />
            <span>상품 이미지 등록</span>
          </S.UploadImgBtn>
          <S.UploadImgItem />
          <S.UploadImgItem />
          <S.UploadImgItem />
        </S.UploadImgList>
      </S.UploadImgBox>
      <S.UploadForm>
        <S.UploadInputBox>
          <label>상품명</label>
          <S.UploadInput />
        </S.UploadInputBox>
        <S.UploadInputBox>
          <label>가격</label>
          <S.UploadInput />
        </S.UploadInputBox>
        <S.UploadInputBox>
          <label>거래위치</label>
          <S.UploadInput />
        </S.UploadInputBox>
        <S.UploadTextAreaBox>
          <label>상품설명</label>
          <S.UploadTextArea />
        </S.UploadTextAreaBox>
        <S.UploadFormBtn type="submit">등록하기</S.UploadFormBtn>
      </S.UploadForm>
    </S.UploadLayout>
  );
};

export default Upload;
