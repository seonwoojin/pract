import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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

const CenterBox = styled.div`
  z-index: 99;
  position: fixed;
  height: 50vh;
  width: 50vw;
  left: calc(50vw / 2);
  top: calc(25vh);
  background-color: blue;
`;

export interface IInfo {
  data: IData;
}

function Home() {
  const divRef = useRef<HTMLDivElement>();
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllNft
  );
  console.log(divRef.current?.offsetTop, divRef.current?.offsetLeft);
  return (
    <HomeContainer>
      <CenterBox
        ref={(element) => {
          if (element !== null) {
            divRef.current = element;
          }
        }}
      ></CenterBox>
      {isLoadingNft ? null : <HomeInfo nftData={NftData!}></HomeInfo>}
    </HomeContainer>
  );
}

export default Home;
