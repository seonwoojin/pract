import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInfoDetail } from "./../axios";
import { useEffect } from "react";
import { AllNft } from "../AllNft";
import { breakingPoint } from "../constants/breakingPoint";

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
  margin-bottom: 200px;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    padding-top: 15vh;
  }
`;

const NewsContainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 90%;
  }
`;

const NewsTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 90%;
  }
`;

const NewsTitle = styled.div`
  width: 1200px;
  height: auto;
  word-break: keep-all;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  font-size: 40px;
  font-weight: 600;
  font-family: sans-serif;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 90%;
    font-size: 16px;
    word-break: break-all;
  }
`;

const NewsTitleLogoWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 20px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 90%;
    font-size: 16px;
    word-break: break-all;
    margin-bottom: 0px;
  }
`;

const NewsTitleLogo = styled.div<{ url: string }>`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    height: 25px;
    width: 25px;
  }
`;

const NewsTitleProjcetName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 600px;
  height: 50px;
  opacity: 0.6;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 50%;
  }
`;

const NewsTitleCreatedAt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 550px;
  height: 50px;
  opacity: 0.6;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    font-size: 14px;
    width: 50%;
  }
`;

const NewSnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1200px;
  height: 20px;
  opacity: 0.6;
  margin-top: 10px;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 90%;
    font-size: 16px;
  }
`;

const NewsDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: auto;
  min-height: 500px;
  padding-top: 20px;
  word-break: keep-all;
  word-wrap: break-word;
  ul {
    list-style-type: disc;
  }
  p {
    display: flex;
  }
  .ql-align-center {
    justify-content: center;
  }
  .ql-align-right {
    justify-content: flex-end;
  }
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 90%;
    font-size: 16px;
  }
`;

interface IData {
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

interface IInfo {
  data: IData;
}

function InfoDetail() {
  const params = useParams();
  const AllNfts = AllNft;
  const { isLoading, data: info } = useQuery<IInfo>([`${params.id}`], () =>
    getInfoDetail(params.id!)
  );

  return (
    <HomeWrapper>
      <NewsContainer>
        {isLoading ? null : (
          <>
            <NewsTitleWrapper>
              <NewsTitle>{info?.data.title}</NewsTitle>
              <NewsTitleLogoWrapper>
                <NewsTitleLogo
                  url={
                    AllNfts[info?.data.chain.toLowerCase()!][info?.data.nft!]
                      ?.logourl
                  }
                ></NewsTitleLogo>
                <NewsTitleProjcetName>
                  {
                    AllNfts[info?.data.chain.toLowerCase()!][info?.data.nft!]
                      .title
                  }
                </NewsTitleProjcetName>
                <NewsTitleCreatedAt>{info?.data.createdAt}</NewsTitleCreatedAt>
              </NewsTitleLogoWrapper>
              <NewSnsContainer>{info?.data.SNS}</NewSnsContainer>
            </NewsTitleWrapper>
            <hr style={{ width: "100%" }}></hr>
            <NewsDescription
              dangerouslySetInnerHTML={{ __html: info?.data.description! }}
            />
          </>
        )}
      </NewsContainer>
    </HomeWrapper>
  );
}

export default InfoDetail;
