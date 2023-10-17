import { motion } from "framer-motion";
import styled from "styled-components";

export const SliderArrowBox = styled.div`
  display: flex;
  position: relative;
`;

export const ArrowBox = styled.div`
  & svg {
    position: absolute;
    cursor: pointer;
    top: 50%;
  }
  #left-arrow {
    left: -8%;
  }
  #right-arrow {
    right: -8%;
  }

  @media screen and (max-width: 860px) {
    #left-arrow {
      left: -10%;
    }
    #right-arrow {
      right: -10%;
    }
  }
`;

export const SlideBox = styled.div`
  position: relative;

  overflow-x: hidden;
`;

export const ProductDetailImg = styled(motion.img)`
  width: 680px;
  height: 450px;
  border-radius: 10px;

  @media screen and (max-width: 860px) {
    width: 290px;
    height: 230px;
  }
`;
