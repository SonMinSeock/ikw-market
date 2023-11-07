import React, { useEffect, useState } from "react";
import * as S from "./Form.style";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
  price: number;
  location: string;
  description: string;
}
interface FormComponentProps {
  onSubmit: (data: any) => void;
  product: IProduct | null;
}
interface IProduct {
  description: string;
  location: string;
  product_images: any;
  product_name: string;
  product_price: number;
  seller_info: any;
  __v: number;
  _id: object;
}

const Form: React.FC<FormComponentProps> = ({ onSubmit, product }) => {
  const { register, handleSubmit, setValue, getValues } = useForm<IForm>();
  const [nameLength, setNameLength] = useState(0);
  const [locationLength, setLocationLength] = useState(0);
  const [descriptionLength, setDescriptionLength] = useState(0);
  // 부모로 데이터 전달
  const handleFormSubmit = (data: IForm) => {
    onSubmit(data);
  };

  // 가격(price) input 콤마 및 최대 길이
  const onChangePriceInput = (e: any) => {
    const inputValue = e.target.value;
    const maxLength = 11; // 원하는 최대 길이로 설정

    // 길이가 최대 길이를 초과하는 경우, 입력값을 최대 길이로 자름
    if (inputValue.length > maxLength) {
      const trimmedValue = inputValue.slice(0, maxLength);
      setValue("price", trimmedValue); // 최대 길이로 자른 값을 필드에 설정
    } else {
      const numericValue = inputValue.replace(/\D/g, ""); // 숫자 외의 문자 제거
      const formattedValue = Number(numericValue).toLocaleString("ko-KR");
      setValue("price", formattedValue as any); // 숫자만 입력된 값을 다시 필드에 설정
    }
  };

  // 입력한 글 길이 출력 함수
  const onChangeNameInput = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === "location") {
      if (value.length > 10) {
        setValue(name, value.slice(0, 10));
        return;
      }
      setLocationLength(value.length);
    }
    if (name === "name") {
      if (value.length > 20) {
        setValue(name, value.slice(0, 20));
        return;
      }
      setNameLength(value.length);
    }
    if (name === "description") {
      if (value.length > 300) {
        setValue(name, value.slice(0, 300));
        return;
      }
      setDescriptionLength(value.length);
    }
  };

  useEffect(() => {
    if (product) {
      onChangeNameInput({ target: { value: product.product_name, name: "name" } });
      onChangeNameInput({ target: { value: product.location, name: "location" } });
      onChangeNameInput({ target: { value: product.description, name: "description" } });
    }
  }, []);

  return (
    <S.UploadForm onSubmit={handleSubmit(handleFormSubmit)}>
      <S.UploadInputBox>
        <label>제목</label>
        <S.UploadInput
          {...register("name", {
            value: product?.product_name,
            required: true,
            maxLength: 20,
          })}
          onChange={(e) => onChangeNameInput(e)}
          placeholder="상품명을 입력해주세요. 20자 이내"
        />
        <S.CharacterLength>{nameLength}/20</S.CharacterLength>
      </S.UploadInputBox>
      <S.UploadInputBox>
        <label>가격</label>
        <S.UploadInput
          {...register("price", {
            value: product?.product_price,
            required: true,
          })}
          onInput={onChangePriceInput} // 숫자만 입력을 위한 이벤트 핸들러
          inputMode="numeric" // 숫자 입력 모드 설정
        />
        <span>원</span>
      </S.UploadInputBox>
      <S.UploadInputBox>
        <label>거래위치</label>
        <S.UploadInput
          {...register("location", {
            required: true,
            value: product?.location,
          })}
          onChange={(e) => onChangeNameInput(e)}
          placeholder="거래장소를 입력해주세요. ex) 운동장.."
        />
        <S.CharacterLength>{locationLength}/10</S.CharacterLength>
      </S.UploadInputBox>
      <S.UploadTextAreaBox>
        <label>상품설명</label>
        <S.UploadTextArea
          {...register("description", {
            required: true,
            value: product?.description,
          })}
          onChange={(e) => onChangeNameInput(e)}
          placeholder="구매시기, 제품상태 , 하자 유무 등 물건 상태에 대한 정확한 설명을 작성해주세요. 10자 이상 300자 내"
        />
        <S.CharacterLength>{descriptionLength}/300</S.CharacterLength>
      </S.UploadTextAreaBox>
      <S.UploadFormBtn type="submit">등록하기</S.UploadFormBtn>
    </S.UploadForm>
  );
};

export default Form;
