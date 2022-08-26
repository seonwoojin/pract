import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NftWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  width: 60vw;
  min-height: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.05);
  margin-bottom: 2vh;
  cursor: pointer;
  @media ${(props) => props.theme.device.tablet} {
    width: 90%;
  }
`;

const NftLogo = styled.div<{ imgurl: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 25%;
  div {
    height: 150px;
    width: 150px;
    background-image: url(${(props) => props.imgurl});
    background-size: cover;
    background-position: center center;
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 40%;
    div {
      height: 80px;
      width: 80px;
    }
  }
`;

const NftDetail = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 75%;
  padding-left: 50px;
  h1 {
    font-family: "Oswald", "Holtwood One SC";
    font-size: 50px;
    font-weight: 600;
    padding-bottom: 4vh;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
    opacity: 0.8;
    z-index: 1;
  }
  div {
    display: flex;
    justify-content: space-between;
  }
  @media ${(props) => props.theme.device.tablet} {
    h1 {
      font-size: 5vw;
    }
    h2 {
      font-size: 3vw;
    }
  }
`;

const Svg = styled(motion.svg)`
  position: absolute;
  right: -4vw;
  width: 50px;
  margin-right: 20px;
  opacity: 1;
  z-index: 99;
`;

const detailVariants: Variants = {
  hover: {
    color: "rgba(255,255,255,1)",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const svgVariants: Variants = {
  hover: {
    opacity: 1,
    fill: "rgb(255,255,255)",
    y: -10,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

interface IProps {
  chain: string;
  url: string;
  title: string;
  rgba: string;
}

function DetailNftBox({ chain, url, title, rgba }: IProps) {
  const wrapperVariants: Variants = {
    hover: {
      backgroundColor: rgba,
      transition: {
        duration: 1,
        type: "tween",
      },
    },
  };
  return (
    <Link
      to={`/${chain.toLowerCase()}/${title
        .replace(/(\s*)/g, "")
        .replace("`", "")
        .toLowerCase()}`}
    >
      <NftWrapper variants={wrapperVariants} whileHover="hover">
        <NftLogo imgurl={url}>
          <div></div>
        </NftLogo>
        <NftDetail variants={detailVariants}>
          <h1>{title}</h1>
          <div>
            <h2>WELCOME TO THE {title}</h2>
          </div>
        </NftDetail>
      </NftWrapper>
    </Link>
  );
}

export default DetailNftBox;
