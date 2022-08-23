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

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100vw;
  font-family: "Open Sans";
  padding-top: 200px;
`;

export interface IInfo {
  data: IData;
}

const AllNfts = AllNft;

const offset = 3;

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IData>();
  const [user, setUser] = useState<IUser>();
  const [token] = useCookies(["token"]);

  const [lastIndex, setLastIndex] = useState(false);
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    ["homeInfo"],
    getAllNft
  );

  // useEffect(() => {
  //   async function getUser() {
  //     axios
  //       .get<IUser>(`http://localhost:4000/api/v1/user/data/`, {
  //         headers: {
  //           Authorization: `Bearer ${token["token"]}`,
  //         },
  //       })
  //       .then((response) => {
  //         setUser(response.data);
  //       });
  //   }
  //   getUser();
  // }, []);
  return (
    <HomeContainer>
      {isLoadingNft
        ? null
        : Object.keys(AllNfts["eth"]).map((key) => (
            <HomeInfo key={key} nftData={NftData!} nft={key}></HomeInfo>
          ))}
    </HomeContainer>
  );
}

export default Home;
