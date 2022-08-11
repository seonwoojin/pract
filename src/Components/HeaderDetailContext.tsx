import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DetailContext = styled.h1`
  position: relative;
  margin-bottom: 20px;
  font-size: 16px;
  opacity: 0.8;
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    width: 100vw;
    font-size: 4vw;
  }
`;

const Border = styled(motion.div)`
  position: absolute;
  bottom: -3px;
  height: 2px;
  background-color: black;
  opacity: 1;
  width: 100%;
  scale: 0.01;
  transform-origin: center left;
`;

const DetailText = styled(motion.div)`
  display: inline-block;
  position: relative;
`;

const borderVariants: Variants = {
  hover: {
    scale: 100,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const textVariants: Variants = {
  hover: {
    opacity: 1,
  },
};

interface IProps {
  title: string;
  chain: string;
}

function HeaderDetailContext({ title, chain }: IProps) {
  return (
    <DetailContext>
      <Link
        to={`/${chain}/${title
          .replace(/(\s*)/g, "")
          .replace("`", "")
          .toLowerCase()}`}
      >
        <DetailText variants={textVariants} whileHover="hover">
          {title}
          <Border variants={borderVariants} />
        </DetailText>
      </Link>
    </DetailContext>
  );
}

export default HeaderDetailContext;
