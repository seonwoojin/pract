import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AllNft } from "./../AllNft";
import PageNotFound from "./PageNotFound";
import { NftChecker } from "./../NftChecker";
import { getNftInfo, IData } from "../axios";
import DetailInfo from "../Components/DetailInfo";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { IUser } from "./../context/DataProvider";
import { axiosInstance } from "../axiosInstance";
import HomeInfo from "../Components/HomeInfo";
import { useQuery } from "@tanstack/react-query";
import { IInfo } from "./Home";

const HomeWrapper = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vh;
  margin-bottom: 10vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  font-size: 40px;
  font-weight: 600;
`;

const SubscribeBox = styled.div<{ subcribe: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${(props) => (props.subcribe ? "#d3cfcf" : "#d01b1b")};
  color: ${(props) => (props.subcribe ? "#212020b3" : "white")};
`;

function Info() {
  const params = useParams();
  const navigate = useNavigate();
  const [favoirte, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subcribe, setSubcribe] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [token] = useCookies(["token"]);
  const allNft = AllNft;
  const { isLoading: isLoadingNft, data: NftData } = useQuery<IInfo>(
    [`${params.nft!}Info`],
    () => getNftInfo(params.nft!)
  );
  const check = NftChecker(params.chain, params.nft);

  useEffect(() => {
    async function getUser() {
      axiosInstance
        .get<IUser>(`/api/v1/user/data/`, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setFavorite(response.data.favoriteNft.includes(params.nft!));
        });
    }
    getUser();
  }, [params]);
  useEffect(() => {
    if (user) {
      if (
        user.favoriteNft.includes(
          params
            .nft!.toLowerCase()
            .replaceAll(" ", "")
            .replaceAll("-", "")
            .replaceAll("`", "")
        )
      ) {
        setSubcribe(true);
      }
    }
  }, [user]);

  const onClickSubcribe = () => {
    if (user) {
      axiosInstance.get(
        `/api/v1/user/favorite/choose/?nft=${params
          .nft!.toLowerCase()
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .replaceAll("`", "")}`,
        {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        }
      );
    }
  };

  if (check === false) {
    return <PageNotFound />;
  }
  return (
    <HomeWrapper key={params.nft}>
      {isLoadingNft ? null : (
        <>
          <TitleWrapper>
            <Title>{allNft[params.chain!][params.nft!].title}</Title>
            <SubscribeBox
              subcribe={subcribe}
              onClick={() => {
                setSubcribe((prev) => !prev);
                onClickSubcribe();
              }}
            >
              {subcribe ? "Subscribing" : "Subcribe"}
            </SubscribeBox>
          </TitleWrapper>
          <HomeInfo isHome={false} nftData={NftData!}></HomeInfo>
        </>
      )}
    </HomeWrapper>
  );
}

export default Info;
