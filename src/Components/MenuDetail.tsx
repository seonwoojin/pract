import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isShow } from "../atom";
import DetailNftBox from "./DetailNftBox";
import { AllNft } from "../AllNft";
import { title } from "process";

const HomeWrapper = styled.div<{ show: boolean }>`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100vw;
  font-family: "Open Sans";
  overflow-x: hidden;
  background-color: ${(props) => (props.show ? "black" : "white")};
  opacity: ${(props) => (props.show ? 0.7 : 1)};
  div {
    opacity: ${(props) => (props.show ? 0.4 : 1)};
  }
`;

const Title = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  width: 60%;
  min-height: 100px;
  height: 5vh;
  font-weight: 600;
  font-size: 60px;
  margin-bottom: 5vh;
  h1 {
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 5px 5px 5px black;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 100%;
    justify-content: center;
  }
`;

const TitleLogo = styled.div<{ url: string }>`
  height: 100px;
  width: 100px;
  min-width: 38px;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 10px;
`;

interface IProps {
  chain: string;
  chainNum: number;
  logoUrl: string;
}

function MenuDetail({ chain, chainNum, logoUrl }: IProps) {
  const show = useRecoilValue(isShow);
  const datas2 = Object.entries(AllNft);
  const datas = Object.entries(datas2[chainNum][1]);
  return (
    <HomeWrapper show={show}>
      <Title>
        <h1>{chain}</h1>
        <TitleLogo url={logoUrl}></TitleLogo>
      </Title>
      {datas.map((data) => (
        <DetailNftBox
          key={data[1].title}
          chain={chain}
          url={data[1].logourl}
          rgba={data[1].rgba}
          title={data[1].title}
        />
      ))}
    </HomeWrapper>
  );
}

export default MenuDetail;
