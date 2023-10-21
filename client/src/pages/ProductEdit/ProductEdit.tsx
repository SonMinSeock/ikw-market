import React, { useEffect, useRef, useState } from "react";
import * as S from "./ProductEdit.style";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import Resizer from "react-image-file-resizer";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import AWS from "aws-sdk";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";

interface IForm {
  name: string;
  price: number;
  location: string;
  description: string;
}

interface IProduct {
  description: string;
  location: string;
  product_images: any;
  product_name: string;
  product_price: number;
  seller_info: any;
  __v: number;
  _id: string;
}

const ProductEdit = () => {
  const uploadImgInput = useRef() as any;
  const navigate = useNavigate();

  const { id } = useParams();

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [fileList, setFileList] = useState<string[]>([]); // 파일 URL을 저장하는 배열로 선언
  const [onModal, setOnModal] = useState(false);
  const [selectImg, setSelectImg] = useState<string>();
  const userInfo = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(true);
  const isLogin = useRecoilValue(isLoginAtom);
  const [product, setProduct] = useState<IProduct | any>();

  const getProductAPI = async (id: any) => {
    const res = await (await axios.get(`http://localhost:3002/product/${id}`, { withCredentials: true })).data;
    if (res.state) {
      setProduct(res.product);
    }
  };

  console.log("product 확인 : ", product?.product_name);

  useEffect(() => {
    if (isLogin) {
      getProductAPI(id);
      setLoading(false);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (loading === false) {
      if (isLogin === true) {
        if (Object.keys(product).length !== 0) {
          let pass = false;
          userInfo.products_on_sale.forEach((product) => {
            if (product._id === id) {
              pass = true;
            }
          });
          if (!pass) navigate("/");
        }
      }
    }
  }, [product]);

  useEffect(() => {
    if (product?.product_images) {
      // 제품 이미지가 있는 경우, fileList에 이미지 URL을 추가
      setFileList(product?.product_images);
    }

    // 기존 이미지가 있을 때 기본 이미지 렌더링 로직
  }, [product?.product_images]);
  AWS.config.update({
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
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
      .post(
        `http://localhost:3002/product/${id}/update`,
        {
          product_name: data.name,
          product_images: imageUrls,
          product_price: data.price,
          location: data.location,
          description: data.description,
        },
        { withCredentials: true }
      )
      .then((res) => (res.data.state ? navigate("/") : null))
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
    setSelectImg(fileList[idx] as any);
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

    // 미리보기 할때 보임. 일단 주석.
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
    <>
      {product ? (
        <S.ProductEditLayout>
          <S.ProductEditTitle>상품 등록</S.ProductEditTitle>
          <S.ProductEditImgBox>
            <S.ProductEditImgList>
              <S.ProductEditImgInput
                onChange={onChangeImgInput}
                ref={uploadImgInput}
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                multiple
              />
              <S.ProductEditImgBtn onClick={onClickImgBtn}>
                <BiImageAdd size={50} />
                <span>상품 이미지 등록</span>
              </S.ProductEditImgBtn>
              {fileList.map((file, idx) => (
                <S.ProductEditImgRow key={idx}>
                  <S.ProductEditImgItem onClick={() => onClickModalOpen(idx)} src={file} />
                  <div>
                    <TiDelete onClick={() => onClickDeleteBtn(idx)} fill="fill" size={35} />
                  </div>
                </S.ProductEditImgRow>
              ))}
            </S.ProductEditImgList>
          </S.ProductEditImgBox>
          <S.ProductEditForm onSubmit={handleSubmit(onValid)}>
            <S.ProductEditInputBox>
              <label>제목</label>
              <S.ProductEditInput
                {...register("name", { value: product?.product_name, required: true, minLength: 5, maxLength: 15 })}
                placeholder="최소 5글자"
              />
            </S.ProductEditInputBox>
            <S.ProductEditInputBox>
              <label>가격</label>
              <S.ProductEditInput
                {...register("price", { value: product?.product_price, required: true })}
                onInput={onChangePriceInput} // 숫자만 입력을 위한 이벤트 핸들러
                inputMode="numeric" // 숫자 입력 모드 설정
              />
              <span>원</span>
            </S.ProductEditInputBox>
            <S.ProductEditInputBox>
              <label>거래위치</label>
              <S.ProductEditInput
                {...register("location", { value: product?.location, required: true })}
                placeholder="ex) 2호관, 운동장 .. "
              />
            </S.ProductEditInputBox>
            <S.ProductEditTextAreaBox>
              <label>상품설명</label>
              <S.ProductEditTextArea
                {...register("description", { value: product?.description, required: true })}
                placeholder="구매시기, 제품상태 , 하자 유무 등 물건 상태에 대한 정확한 설명을 작성해주세요."
              />
            </S.ProductEditTextAreaBox>
            <S.ProductEditFormBtn type="submit">등록하기</S.ProductEditFormBtn>
          </S.ProductEditForm>

          {/* 모달창 */}
          <Modal isOpen={onModal} onRequestClose={closeModal} selectImg={selectImg} />
        </S.ProductEditLayout>
      ) : null}
    </>
  );
};

export default ProductEdit;
