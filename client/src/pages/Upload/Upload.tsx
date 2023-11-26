import { useEffect, useRef, useState } from "react";
import * as S from "./Upload.style";
import { BiImageAdd } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import Resizer from "react-image-file-resizer";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import AWS from "aws-sdk";
import { useNavigate, redirect } from "react-router-dom";
import Form from "../../components/Form/Form";
import { useRecoilValue } from "recoil";
import { isLoginAtom } from "../../recoil/login/atoms";
import { IForm } from "../../types/formType";

const Upload = () => {
  const [fileList, setFileList] = useState<string[]>([]); // 파일 URL을 저장하는 배열로 선언
  const [onModal, setOnModal] = useState(false);
  const [selectImg, setSelectImg] = useState<string>();
  const isLogin = useRecoilValue(isLoginAtom);
  const uploadImgInput = useRef() as any;
  const region = process.env.REACT_APP_REGION;
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  useForm<IForm>();

  useEffect(() => {
    if (isLogin === false) navigate("/login");
  }, []);

  AWS.config.update({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  const navigate = useNavigate();

  // form submit
  const onValid = async (data: IForm) => {
    if (fileList.length === 0) {
      alert("사진을 등록해주세요");
      return;
    }

    const formData = await axios
      .post(
        `${process.env.REACT_APP_EXPRESS_URL}/api/product/upload`,
        {
          name: data.name,
          images: fileList,
          price: data.price,
          location: data.location,
          description: data.description,
          state: false,
        },
        { withCredentials: true }
      )
      .then((res) => (res.data.state ? navigate("/") : null))
      .catch((err) => console.log(err));
    return formData;
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

    // AWS S3에서 이미지 삭제
    const deleteImageFromS3 = async (key: string) => {
      const params = {
        Bucket: "ikw-market-image",
        Key: key,
      };
      const s3 = new AWS.S3();
      await s3.deleteObject(params).promise();
    };

    // 이미지 삭제 후 file list에서도 삭제
    try {
      await deleteImageFromS3(fileList[idx].split("/")[3]);
      tmpFileList.splice(idx, 1);
      setFileList(tmpFileList);
    } catch (error) {
      console.error("AWS S3 이미지 삭제 오류:", error);
      // 에러 처리 - 이미지 삭제 실패
    }
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
              <S.UploadImgItem onClick={() => onClickModalOpen(idx)} src={file} />
              <div>
                <TiDelete onClick={() => onClickDeleteBtn(idx)} fill="fill" size={35} />
              </div>
            </S.UploadImgRow>
          ))}
        </S.UploadImgList>
      </S.UploadImgBox>
      <Form onSubmit={onValid} product={null} />

      {/* 모달창 */}
      <Modal isOpen={onModal} onRequestClose={closeModal} selectImg={selectImg} />
    </S.UploadLayout>
  );
};

export default Upload;
