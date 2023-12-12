import React, { useEffect, useState } from "react";
import * as S from "./Form.style";
import { useForm } from "react-hook-form";
import { IFormComponentProps, IForm } from "../../types/formType";
import { useInput } from "../../hooks/useInput";

const Form: React.FC<IFormComponentProps> = ({ onSubmit, product }) => {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const nameInput = useInput(product?.name || "", 20, false);
  const priceInput = useInput(product?.price || "", 11, true);
  const locationInput = useInput(product?.location || "", 10, false);
  const descriptionInput = useInput(product?.description || "", 300, false);

  // 부모로 데이터 전달
  const handleFormSubmit = (data: IForm) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("location", product.location);
      setValue("description", product.description);
    }
  }, []);

  return (
    <S.UploadForm onSubmit={handleSubmit(handleFormSubmit)}>
      <S.UploadInputBox>
        <label>제목</label>
        <S.UploadInput
          {...register("name", {
            required: true,
          })}
          value={nameInput.value}
          onInput={nameInput.onInput}
          placeholder="상품명을 입력해주세요. 20자 이내"
        />
        <S.CharacterLength>{nameInput.length}/20</S.CharacterLength>
      </S.UploadInputBox>
      <S.UploadInputBox>
        <label>가격</label>
        <S.UploadInput
          {...register("price", {
            required: true,
          })}
          value={priceInput.value}
          onInput={priceInput.onInput} // 숫자만 입력을 위한 이벤트 핸들러
          inputMode="numeric" // 숫자 입력 모드 설정
        />
        <span>원</span>
      </S.UploadInputBox>
      <S.UploadInputBox>
        <label>거래위치</label>
        <S.UploadInput
          {...register("location", {
            required: true,
          })}
          value={locationInput.value}
          onInput={locationInput.onInput}
          placeholder="거래장소를 입력해주세요. ex) 운동장.."
        />
        <S.CharacterLength>{locationInput.length}/10</S.CharacterLength>
      </S.UploadInputBox>
      <S.UploadTextAreaBox>
        <label>상품설명</label>
        <S.UploadTextArea
          {...register("description", {
            required: true,
          })}
          value={descriptionInput.value}
          onInput={descriptionInput.onInput}
          placeholder="구매시기, 제품상태 , 하자 유무 등 물건 상태에 대한 정확한 설명을 작성해주세요. 10자 이상 300자 내"
        />
        <S.CharacterLength>{descriptionInput.length}/300</S.CharacterLength>
      </S.UploadTextAreaBox>
      <S.UploadFormBtn type="submit">등록하기</S.UploadFormBtn>
    </S.UploadForm>
  );
};

export default Form;
