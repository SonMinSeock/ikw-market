import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import * as S from "./Slider.style";

export default function Slider() {
  const [visible, setVisible] = useState<number>(0);
  const [back, setBack] = useState<boolean>(false);
  const arrowIconSize = 23;

  const images = [
    "https://t4.ftcdn.net/jpg/06/34/00/69/240_F_634006945_eGQCGQrinCG5nVmhUtZ0LumH9EoGFoDt.jpg",
    "https://t3.ftcdn.net/jpg/01/23/17/82/240_F_123178240_ZIZQmUuo84kWqB2ZD2quaKVbFSo7Uq7t.jpg",
    "https://t3.ftcdn.net/jpg/04/31/72/70/240_F_431727023_tgAI6ORGvruHGQmP1sXnHkAHR1fwb7cK.jpg",
  ];
  const boxVairants = {
    entry: () => ({
      x: 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (isBack: boolean) => ({
      x: isBack ? 500 : -500,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === images.length - 1 ? images.length - 1 : prev + 1));
  };

  const previousPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const swipeConfidenceThreshold = 10000;

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      <S.SliderArrowBox>
        {visible > 0 ? (
          <S.ArrowBox>
            <AiOutlineLeft size={arrowIconSize} onClick={previousPlease} id="left-arrow" />
          </S.ArrowBox>
        ) : null}
        <S.SlideBox>
          <AnimatePresence mode="wait" custom={back}>
            {images.map((image, idx) =>
              idx === visible ? (
                <S.ProductDetailImg
                  src={image}
                  key={idx}
                  custom={back}
                  variants={boxVairants}
                  initial="entry"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e: any, { offset, velocity }: any) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      setBack(false);
                      setVisible((prev) => (prev === images.length - 1 ? images.length - 1 : prev + 1));
                    } else if (swipe > swipeConfidenceThreshold) {
                      setBack(true);
                      setVisible((prev) => (prev === 0 ? 0 : prev - 1));
                    }
                  }}
                />
              ) : null
            )}
          </AnimatePresence>
        </S.SlideBox>
        {visible !== images.length - 1 ? (
          <S.ArrowBox>
            <AiOutlineRight size={arrowIconSize} onClick={nextPlease} id="right-arrow" />{" "}
          </S.ArrowBox>
        ) : null}
      </S.SliderArrowBox>
    </>
  );
}
