import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAllNft, IData } from "../axios";
import { DataContext, IUser } from "../context/DataProvider";
import { NftChecker } from "../NftChecker";
import { AllNft, AllNftNonChain } from "../AllNft";
import InfoList from "../Components/InfoList";
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
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState<number>(
    width >= 2200
      ? 5
      : width >= 1800
      ? 4
      : width >= 1400
      ? 3
      : width >= 1000
      ? 2
      : width >= 600
      ? 1
      : 0
  );

  return (
    <HomeContainer>
      {isLoadingNft ? null : (
        <>
          <NewProject NftData={NftData!} />
          <InfoList
            isHome={true}
            nftData={NftData!}
            HomeOffset={offset}
          ></InfoList>
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
