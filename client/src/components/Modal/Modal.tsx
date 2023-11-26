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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "black",
          borderRadius: "4px",
          border: "none",
          overflow: "hidden",
          padding: 0,
        },
      }}
      shouldCloseOnOverlayClick={true}
    >
      <S.Button>
        <TiDelete onClick={onRequestClose} color="#ffc901" size={40} />
      </S.Button>
      <S.ImgWrap>
        <img src={selectImg} alt="사진" />
      </S.ImgWrap>
    </ReactModal>,
    document.body // 모달을 document의 body 아래에 렌더링
  );
};

export default Modal;
