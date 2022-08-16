import styled from "styled-components";
import { useParams } from "react-router-dom";
import { AllNft } from "./../AllNft";
import PageNotFound from "./PageNotFound";
import { title } from "process";
import { NftChecker } from "./../NftChecker";
import { useQuery } from "@tanstack/react-query";
import { getNftInfo } from "../axios";
import nft from "./../api/v1/nft/index";
import { transform } from "typescript";

const HomeWrapper = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100vw;
  font-family: "Open Sans";
  overflow-x: hidden;
`;

const InfoWrapper = styled.div`
  display: flex;
  position: relative;
  height: 45vh;
  width: 80%;
`;

const InfoContext = styled.div`
  position: absolute;
  left: 0;
  height: 100%;
  width: 50%;
  background-color: transparent;
  padding-top: 7vh;
  padding-left: 5vw;
`;

const InfoContextTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2vh;
`;

const InfoContextText = styled.div`
  font-size: 30px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoImage = styled.div`
  position: absolute;
  right: 0;
  z-index: -1;
  opacity: 0.9;
  height: 100%;
  width: 60%;
  background: url("https://images.cointelegraph.com/images/717_aHR0cHM6Ly9zMy5jb2ludGVsZWdyYXBoLmNvbS91cGxvYWRzLzIwMjItMDgvMWQxNmRhNTUtOTkxYi00MzRlLWE2MGYtZDY1NGU3YzQ2NjY4LmpwZw==.jpg");
  background-position: center center;
  background-size: cover;
`;

function Info() {
  const params = useParams();
  const check = NftChecker(params.chain, params.nft);
  const { isLoading, data } = useQuery([`${params.nft}`], () =>
    getNftInfo(params.nft!)
  );
  console.log(data);
  if (check === false) {
    return <PageNotFound />;
  }
  return (
    <HomeWrapper>
      <InfoWrapper>
        <InfoContext>
          <InfoContextTitle>
            A slice of the punk: CryptoPunk NFT to be split into thousands of
            pieces
          </InfoContextTitle>
          <InfoContextText>
            Nonfungible tokens (NFTs) continue to capture the imagination of the
            cryptocurrency space, with some of the most popular projects
            attracting hundreds of millions of dollars from investors. Projects
            such as CryptoPunks and the Bored Ape Yacht Club epitomize the
            exclusivity of the most lucrative collections, with each NFT far
            from accessible to the average investor.\n\nA new campaign intends
            to give a wider base of investors a stake in some of the most
            valuable NFTs by fractionalizing ownership to reinstate
            accessibility. Unique Network, an NFT infrastructure running on the
            Kusama and Polkadot networks, will split the ownership of a
            CryptoPunk to more than 56,000 addresses that have signed up for a
            share.\n\nThe campaign offers users a chance to participate in what
            has become a highly siloed environment, as Unique Network CEO
            Alexander Mitrovich explained in a statement
          </InfoContextText>
        </InfoContext>
        <InfoImage></InfoImage>
      </InfoWrapper>
    </HomeWrapper>
  );
}

export default Info;
