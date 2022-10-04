import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAllNft, IData } from "../axios";
import { DataContext, IUser } from "../context/DataProvider";
import { NftChecker } from "../NftChecker";
import { AllNft, AllNftNonChain } from "../AllNft";
import HomeInfo from "../Components/HomeInfo";
import { breakingPoint } from "../constants/breakingPoint";
import NewProject from "./../Components/NewProject";
import { useEffect, useState } from "react";
import useWindowDimensions from "../useWindowDimensions";

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 120vh;
  width: 100vw;
  font-family: "Open Sans";
  padding-top: 200px;
  overflow-x: hidden;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    padding-top: 100px;
  }
`;

export interface IInfo {
  data: IData;
}

export interface IPost {
  _id: string;
  chain: string;
  nft: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  likes: [string];
  unlikes: [string];
  SNS: string;
  hashTags: [string];
  text: string;
}

function Home() {
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllNft
  );
  const [offset, setOffset] = useState(5);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width >= 2200) {
      setOffset(5);
    } else if (width >= 1800) {
      setOffset(4);
    } else if (width >= 1400) {
      setOffset(3);
    } else if (width >= 1000) {
      setOffset(2);
    } else if (width >= 600) {
      setOffset(1);
    }
  }, [width]);

  return (
    <HomeContainer>
      {isLoadingNft ? null : (
        <>
          <NewProject NftData={NftData!} />
          <HomeInfo
            isHome={true}
            nftData={NftData!}
            HomeOffset={offset}
          ></HomeInfo>
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
