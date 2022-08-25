import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../axios";
import { IInfo } from "./Home";
import { useLocation, useParams } from "react-router-dom";
import HomeInfo from "../Components/HomeInfo";
import styled from "styled-components";
import { useEffect, useState } from "react";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 100vw;
  font-family: "Open Sans";
  padding-top: 200px;
`;

interface ILocation {
  state: { search: string };
}

function Search() {
  const [empty, setEmpty] = useState(false);
  const { state } = useLocation() as ILocation;
  const { isLoading, data: searchedNft } = useQuery<IInfo>(
    [`search${state.search}`],
    () => getSearch(state.search)
  );
  useEffect(() => {
    if (!isLoading) {
      if (Object.values(searchedNft?.data!).length === 0) {
        setEmpty(true);
      }
    }
  }, [isLoading]);
  return (
    <HomeContainer>
      {isLoading ? null : empty ? (
        <div>없음</div>
      ) : (
        <HomeInfo nftData={searchedNft!}></HomeInfo>
      )}
    </HomeContainer>
  );
}

export default Search;
