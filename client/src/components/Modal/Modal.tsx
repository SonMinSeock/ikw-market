import React from "react";
import ReactModal from "react-modal";
import * as S from "./Modal.style";
import ReactDOM from "react-dom";
import { TiDelete } from "react-icons/ti";

const Modal = ({ isOpen, onRequestClose, selectImg }: any) => {
  return ReactDOM.createPortal(
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          zIndex: "999",
          overflow: "hidden",
        },
        content: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          background: "black",
          overflow: "auto",
          borderRadius: "4px",
        },
      }}
      shouldCloseOnOverlayClick={true}>
      <S.ModalLayout>
        <img src={selectImg} alt="사진" />
        <TiDelete onClick={onRequestClose} color="#fff" size={40} />
      </S.ModalLayout>
    </ReactModal>,
    document.body // 모달을 document의 body 아래에 렌더링
  );
};

export default Modal;
