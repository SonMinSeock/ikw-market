import { useEffect, useRef, useState } from "react";
import * as S from "./ProductEdit.style";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import Resizer from "react-image-file-resizer";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import AWS from "aws-sdk";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginAtom, userAtom } from "../../recoil/login/atoms";
import Form from "../../components/Form/Form";
import { IForm } from "../../types/formType";
import { IProduct } from "../../types/productType";

const ProductEdit = () => {
  const { setValue } = useForm<IForm>();
  const [fileList, setFileList] = useState<string[]>([]); // 파일 URL을 저장하는 배열로 선언
  const [onModal, setOnModal] = useState(false);
  const [selectImg, setSelectImg] = useState<string>();
  const userInfo = useRecoilValue(userAtom);
  const [loading, setLoading] = useState(true);
  const isLogin = useRecoilValue(isLoginAtom);
  const [product, setProduct] = useState<IProduct | any>();
  const uploadImgInput = useRef() as any;
  const navigate = useNavigate();

  const region = process.env.REACT_APP_REGION;
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  const { id } = useParams();

  const getProductAPI = async (id: string | undefined) => {
    const res = await (
      await axios.get(`${process.env.REACT_APP_EXPRESS_URL}/api/product/${id}`, { withCredentials: true })
    ).data;
    if (res.state) {
      setProduct(res.product);
    }
  };

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
          userInfo.on_sale.forEach((product) => {
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
    if (product?.images) {
      // 제품 이미지가 있는 경우, fileList에 이미지 URL을 추가
      setFileList(product?.images);
    }

    // 기존 이미지가 있을 때 기본 이미지 렌더링 로직
  }, [product?.images]);

  AWS.config.update({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  // form submit
  const onValid = async (data: IForm) => {
    if (fileList.length === 0) {
      alert("사진을 등록해주세요");
      return;
    }

    const formData = await axios
      .post(
        `${process.env.REACT_APP_EXPRESS_URL}/api/product/${id}/update`,
        {
          name: data.name,
          images: fileList,
          price: data.price,
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
  const onClickDeleteBtn = async (idx: number) => {
    const tmpFileList = [...fileList];
    tmpFileList.splice(idx, 1);
    setFileList(tmpFileList);
  };

  // 이미지 최적화, 미리보기
  const onChangeImgInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    const newFileList: string[] = [];

    if (files) {
      if (files.length > 3) {
        alert("사진은 최대 3개까지 첨부할 수 있습니다");
        return;
      }
      for (let i = 0; i < files.length; i++) {
        const resizedImage = await resizeImage(files[i]);
        const params = {
          Bucket: "ikw-market-image",
          Key: `${Date.now()}.${i}.webp`,
          Body: resizedImage,
        };

        await new AWS.S3().upload(params as any).promise();

        // AWS S3 서버에 이미지를 업로드합니다.
        const awsImageUrl = `https://${params.Bucket}.s3.${region}.amazonaws.com/${params.Key}`;
        newFileList.push(awsImageUrl);
      }
      e.target.value = "";
      setFileList([...fileList, ...newFileList]);
    }
  };

  const resizeImage = (file: File) => {
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
          <Form onSubmit={onValid} product={product} />

          {/* 모달창 */}
          <Modal isOpen={onModal} onRequestClose={closeModal} selectImg={selectImg} />
        </S.ProductEditLayout>
      ) : null}
    </>
  );
};

export default ProductEdit;
