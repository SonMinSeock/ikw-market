import { motion } from "framer-motion";
import styled from "styled-components";

export const SlideBox = styled.div`
  position: relative;
  & svg {
    cursor: pointer;
    position: absolute;
    top: 50%;
  }
  & svg:first-child {
    left: -25px;
  }
  & svg:last-child {
    right: -25px;
  }
`;

export const ProductDetailImg = styled(motion.img)`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  @media screen and (max-width: 860px) {
    width: 290px;
    height: 230px;
  }
`;
