import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAllNft, IData } from "../axios";
import { IUser } from "../context/DataProvider";
import { NftChecker } from "../NftChecker";
import { AllNft } from "../AllNft";
import HomeInfo from "../Components/HomeInfo";
import { breakingPoint } from "../constants/breakingPoint";

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

function Home() {
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllNft
  );

  return (
    <HomeContainer>
      {isLoadingNft ? null : <HomeInfo nftData={NftData!}></HomeInfo>}
    </HomeContainer>
  );
}

export default Home;
