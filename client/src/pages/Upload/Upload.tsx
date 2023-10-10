import React, { useRef, useState } from "react";
import * as S from "./Upload.style";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import Resizer from "react-image-file-resizer";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import AWS from "aws-sdk";

interface IForm {
  name: string;
  price: number;
  location: string;
  description: string;
}

const Upload = () => {
  const uploadImgInput = useRef() as any;
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [fileList, setFileList] = useState<string[]>([]); // 파일 URL을 저장하는 배열로 선언
  const [onModal, setOnModal] = useState(false);
  const [selectImg, setSelectImg] = useState<string>();

  AWS.config.update({
    region: process.env.NEXT_PUBLIC_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  });

  // form submit
  const onValid = async (data: IForm) => {
    if (fileList.length === 0) {
      alert("사진을 등록해주세요");
      return;
    }

    // aws s3 서버 이미지 저장
    const upload = fileList.map((file, idx) => {
      const params = {
        Bucket: "ikw-market",
        Key: `${Date.now()}.${idx}.webp`,
        Body: file,
      };
      return new AWS.S3().upload(params).promise();
    });

    // 비동기로 upload 함수 실행 후 aws s3 이미지 링크 저장
    const uploadResults = await Promise.all(upload);
    const imageUrls = uploadResults.map((result) => result.Location);

    const formData = await axios
      .post("http://localhost:3002/", {
        product_name: data.name,
        product_images: imageUrls,
        product_price: data.price,
        location: data.location,
        description: data.description,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    return formData;
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

  // 이미지 등록 버튼
  const onClickImgBtn = () => {
    if (fileList.length > 2) {
      alert("사진은 최대 3개까지 첨부할 수 있습니다");
    } else {
      uploadImgInput.current.click();
    }
  };

  // 이미지 클릭시 모달창 보여주기
  const onClickModalOpen = (idx: number) => {
    setOnModal((prev) => !prev);
    setSelectImg(URL.createObjectURL(fileList[idx] as any));
    document.body.style.overflow = "hidden";
  };

  // 모달닫기
  const closeModal = () => {
    setOnModal(false);
    document.body.style.overflow = "auto";
  };

  // 이미지 삭제 버튼
  const onClickDeleteBtn = (idx: number) => {
    const tmpFileList = [...fileList];
    tmpFileList.splice(idx, 1);
    setFileList(tmpFileList);
  };

  // 이미지 최적화, 미리보기
  const onChangeImgInput = async (e: any) => {
    e.preventDefault();
    const files = e.target.files;
    const newFileList: string[] = [];

    if (files.length > 3) {
      alert("사진은 최대 3개까지 첨부할 수 있습니다");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const resizedImage = await resizeImage(files[i]);
      newFileList.push(resizedImage as any);
    }

    setFileList([...fileList, ...newFileList]);
  };

  const resizeImage = (file: any) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        1024, // 원하는 너비 설정
        1024, // 원하는 높이 설정
        "WEBP", // 이미지 포맷 (원하는 포맷으로 변경 가능)
        100, // 이미지 품질 (원하는 품질로 변경 가능)
        0, // 회전 각도 (회전하지 않으려면 0)
        (uri) => {
          resolve(uri as string);
        },
        "blob" // 출력 형식
      );
    });
  };

  return (
    <S.UploadLayout>
      <S.UploadTitle>상품 등록</S.UploadTitle>
      <S.UploadImgBox>
        <S.UploadImgList>
          <S.UploadImgInput
            onChange={onChangeImgInput}
            ref={uploadImgInput}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            multiple
          />
          <S.UploadImgBtn onClick={onClickImgBtn}>
            <BiImageAdd size={50} />
            <span>상품 이미지 등록</span>
          </S.UploadImgBtn>
          {fileList.map((file, idx) => (
            <S.UploadImgRow key={idx}>
              <S.UploadImgItem onClick={() => onClickModalOpen(idx)} src={URL.createObjectURL(file as any)} />
              <div>
                <TiDelete onClick={() => onClickDeleteBtn(idx)} fill="fill" size={35} />
              </div>
            </S.UploadImgRow>
          ))}
        </S.UploadImgList>
      </S.UploadImgBox>
      <S.UploadForm onSubmit={handleSubmit(onValid)}>
        <S.UploadInputBox>
          <label>제목</label>
          <S.UploadInput
            {...register("name", { required: true, minLength: 5, maxLength: 15 })}
            placeholder="최소 5글자"
          />
        </S.UploadInputBox>
        <S.UploadInputBox>
          <label>가격</label>
          <S.UploadInput
            {...register("price", { required: true })}
            onInput={onChangePriceInput} // 숫자만 입력을 위한 이벤트 핸들러
            inputMode="numeric" // 숫자 입력 모드 설정
          />
          <span>원</span>
        </S.UploadInputBox>
        <S.UploadInputBox>
          <label>거래위치</label>
          <S.UploadInput {...register("location", { required: true })} placeholder="ex) 2호관, 운동장 .. " />
        </S.UploadInputBox>
        <S.UploadTextAreaBox>
          <label>상품설명</label>
          <S.UploadTextArea
            {...register("description", { required: true })}
            placeholder="구매시기, 제품상태 , 하자 유무 등 물건 상태에 대한 정확한 설명을 작성해주세요."
          />
        </S.UploadTextAreaBox>
        <S.UploadFormBtn type="submit">등록하기</S.UploadFormBtn>
      </S.UploadForm>

      {/* 모달창 */}
      <Modal isOpen={onModal} onRequestClose={closeModal} selectImg={selectImg} />
    </S.UploadLayout>
  );
};

export default Upload;
