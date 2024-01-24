import React, { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/common/atoms/Button";
import Input from "../../../components/common/atoms/Input";
import { BiImageAdd } from "react-icons/bi";
import UploadImagePreview from "./UploadImagePreview";
import AWS from "aws-sdk";
import Resizer from "react-image-file-resizer";

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

const buttonStyle = {
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
};

const UploadImageInput = ({ fileList, setFileList }: any) => {
  const region = process.env.REACT_APP_REGION;
  const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
  const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

  AWS.config.update({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  });

  const uploadImgInput = useRef() as any;

  const onClickButton = () => {
    if (fileList.length > 2) {
      alert("사진은 최대 3개까지 첨부할 수 있습니다");
    } else {
      uploadImgInput.current.click();
    }
  };

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

  const onDeleteImage = async (idx: number) => {
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
    }
  };
  return (
    <UploadImageInputLayout>
      <Input
        onChange={onChangeImgInput}
        ref={uploadImgInput}
        style={{ display: "none" }}
        type="file"
        accept="image/jpg, image/jpeg, image/png"
      />
      <Button style={buttonStyle} type="button" onClick={onClickButton}>
        <BiImageAdd size={50} />
        상품 이미지 등록
      </Button>
      <div style={{ display: "flex" }}>
        {fileList.map((image: string, idx: number) => (
          <UploadImagePreview onDelete={() => onDeleteImage(idx)} key={idx} image={image} />
        ))}
      </div>
    </UploadImageInputLayout>
  );
};

export default UploadImageInput;
