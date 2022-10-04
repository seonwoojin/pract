import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../axios";
import { IInfo } from "./Home";
import { useLocation, useParams } from "react-router-dom";
import InfoList from "../Components/InfoList";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AllNft, AllNftNonChain } from "../AllNft";
import DetailInfo from "../Components/DetailInfo";
import DetailNftBox from "../Components/DetailNftBox";
import { title } from "process";
import { axiosInstance } from "../axiosInstance";
import { IUser } from "../context/DataProvider";
import { useCookies } from "react-cookie";
import useWindowDimensions from "../useWindowDimensions";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  font-family: "Open Sans";
  padding-top: 200px;
`;

interface ILocation {
  state: { search: string };
}

function Search() {
  const allNft = AllNftNonChain;
  const params = useParams();
  const [empty, setEmpty] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProjcet, setIsProject] = useState<string[]>([]);
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
  const { isLoading, data: searchedNft } = useQuery<IInfo>(
    [`search${params.search}`],
    () => getSearch(params.search!)
  );
  const [token] = useCookies(["token"]);
  useEffect(() => {
    setIsProject([]);
    if (params.search!.length > 0) {
      Object.values(allNft).map((project) => {
        if (project.title.toLowerCase().includes(params.search!)) {
          setIsProject((prev) => [
            ...prev,
            project.title
              .toLowerCase()
              .replaceAll(" ", "")
              .replaceAll("-", "")
              .replaceAll("`", ""),
          ]);
        }
      });
    }
  }, [params.search]);
  useEffect(() => {
    if (!isLoading) {
      if (Object.values(searchedNft?.data!).length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
    }
  }, [searchedNft]);

  useEffect(() => {
    async function getUser() {
      axiosInstance
        .get<IUser>(`/api/v1/user/data/`, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) => {
          if (!response.data) {
            setUser({} as IUser);
          }
          setUser(response.data);
          setIsUserLoading(false);
        });
    }
    getUser();
  }, [params]);

  return (
    <HomeContainer>
      {isProjcet.length === 0 ? null : isUserLoading ? null : (
        <>
          {isProjcet.map((title) => (
            <DetailNftBox
              key={Object(allNft)[title].title}
              chain={Object(allNft)[title].chain}
              url={Object(allNft)[title].logourl}
              rgba={Object(allNft)[title].rgba}
              title={Object(allNft)[title].title}
              userData={user!}
            />
          ))}
          <hr
            style={{ border: "1px solid rgba(0,0,0,0.5)", width: "85vw" }}
          ></hr>
        </>
      )}
      {isLoading ? null : empty ? (
        <div>없음</div>
      ) : (
        <InfoList
          HomeOffset={offset}
          isHome={false}
          nftData={searchedNft!}
        ></InfoList>
      )}
    </HomeContainer>
  );
}

export default Search;
