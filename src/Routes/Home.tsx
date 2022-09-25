import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAllNft, IData } from "../axios";
import { DataContext, IUser } from "../context/DataProvider";
import { NftChecker } from "../NftChecker";
import { AllNft, AllNftNonChain } from "../AllNft";
import HomeInfo from "../Components/HomeInfo";
import { breakingPoint } from "../constants/breakingPoint";
import NewProject from "./../Components/NewProject";
import { useRecoilState } from "recoil";
import { isLogined } from "../atom";

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
}

function Home() {
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllNft
  );
  const AllNftNonChains = AllNftNonChain;
  const project: string[] = [];
  const [newPost, setNewPost] = useState<IPost[]>([]);
  const { user } = useContext(DataContext);
  const [userFavorite, setUserFavorite] = useState(
    Object.keys(AllNftNonChains)
  );
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const date = new Date();
  useEffect(() => {
    if (!isLoadingNft) {
      setNewPost([]);
      if (isLogin && user) {
        // if (typeof user.favoriteNft === "undefined") {
        //   window.location.replace("/");
        // }
        if (typeof user.favoriteNft !== "undefined") {
          Object.values(NftData!.data)
            .filter((project) => user.favoriteNft.includes(project.nft))
            .map((info) => {
              if (
                new Date(info.createdAt).getTime() -
                  new Date().setDate(date.getDate() - 14) >=
                  0 &&
                !project.includes(info.nft)
              ) {
                setNewPost((prev) => [...prev, info]);
                project.push(info.nft);
              }
            });
          setUserFavorite(user.favoriteNft);
        } else {
          Object.values(NftData!.data).map((info) => {
            if (
              new Date(info.createdAt).getTime() -
                new Date().setDate(date.getDate() - 14) >=
                0 &&
              !project.includes(info.nft)
            ) {
              setNewPost((prev) => [...prev, info]);
              project.push(info.nft);
            }
          });
        }
      } else {
        {
          Object.values(NftData!.data).map((info) => {
            if (
              new Date(info.createdAt).getTime() -
                new Date().setDate(date.getDate() - 14) >=
                0 &&
              !project.includes(info.nft)
            ) {
              setNewPost((prev) => [...prev, info]);
              project.push(info.nft);
            }
          });
        }
      }
    }
  }, [isLoadingNft, user]);
  return (
    <HomeContainer>
      {isLoadingNft ? null : (
        <>
          <NewProject
            newPost={newPost}
            nftData={NftData!}
            userFavorite={userFavorite}
          />
          <HomeInfo nftData={NftData!}></HomeInfo>
        </>
      )}
    </HomeContainer>
  );
}

export default Home;
