import { motion, Variants } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isShow } from "../atom";
import DetailNftBox from "../Components/DetailNftBox";
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

const Title = styled.div<{ logoColor: string }>`
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  min-height: 100px;
  height: 5vh;
  font-weight: 600;
  font-size: 60px;
  margin-bottom: 5vh;
  h1 {
    background: ${(props) => props.logoColor};
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
  logoColor: string;
}

interface nftType {
  [key: string]: { url: string; fullChain: string };
}

interface logoColor {
  [key: string]: string;
}

function MenuDetail({ chain }: IProps) {
  const logoColor: logoColor = {
    eth: "linear-gradient(to right, rgb(140,140,140), rgb(20,20,20))",
    sol: "linear-gradient(to right, #9945FF, #14F195)",
    klay: "linear-gradient(to right, #BA2118, #FFA929)",
  };
  const logo: nftType = {
    eth: {
      url: "https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/cdbe4/eth-diamond-black.webp",
      fullChain: "Ethereum",
    },
    sol: {
      url: "https://cryptologos.cc/logos/solana-sol-logo.png?v=023",
      fullChain: "Solana",
    },
    klay: {
      url: "https://s2.coinmarketcap.com/static/img/coins/200x200/4256.png",
      fullChain: "Klaytn",
    },
  };
  const show = useRecoilValue(isShow);
  const datas = Object.entries(AllNft[chain]);
  return (
    <HomeWrapper show={show}>
      <Title logoColor={logoColor[chain]}>
        <h1>{logo[chain].fullChain}</h1>
        <TitleLogo url={logo[chain].url}></TitleLogo>
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
