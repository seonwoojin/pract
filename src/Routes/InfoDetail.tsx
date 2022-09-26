import styled from "styled-components";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInfoDetail } from "./../axios";
import { useContext, useEffect, useState } from "react";
import { AllNft } from "../AllNft";
import { breakingPoint } from "../constants/breakingPoint";
import { DataContext } from "../context/DataProvider";
import { axiosInstance } from "../axiosInstance";
import { useCookies } from "react-cookie";
import { response } from "./../constants/response";
import { useScroll } from "framer-motion";

const HomeWrapper = styled.div`
  position: relative;
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100vw;
  font-family: "Open Sans";
  overflow-x: hidden;
  margin-bottom: 200px;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    padding-top: 15vh;
  }
`;

const TopIndexContainer = styled.div`
  position: absolute;
  top: 10vh;
  display: flex;
`;

const TopIndex = styled.div<{ isIndex: boolean }>`
  width: 80px;
  height: 5px;
  background-color: ${(props) => props.theme.fontColor};
  opacity: ${(props) => (props.isIndex ? "1" : "0.5")};
  :not(last-child) {
    margin-right: 10px;
  }
`;

const LeftArrow = styled.div`
  position: fixed;
  left: 5vw;
  top: 50vh;
  svg {
    width: 50px;
    fill: ${(props) => props.theme.fontColor};
  }
`;

const RightArrow = styled.div`
  position: fixed;
  right: 5vw;
  top: 50vh;
  svg {
    width: 50px;
    fill: ${(props) => props.theme.fontColor};
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
  text-align: center;
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
  h1 {
    font-size: 26px;
  }
  h2 {
    font-size: 19px;
  }
  h3 {
    font-size: 15.5px;
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

const ButtonBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 45px;
  border-radius: 20px;
  border: 3px solid black;
  font-family: "Open Sans";
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) => props.theme.lighter};
  margin-right: 20px;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.darker};
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
  window.scrollTo(0, 0);
  const today = new Date();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isBanner, setIsBanner] = useState(
    location.search.slice(8) === "true" ? true : false
  );
  const [recentData, setRecentData] = useState<IData[]>();
  const [index, setIndex] = useState(0);
  const params = useParams();
  const { user } = useContext(DataContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token] = useCookies(["token"]);
  const AllNfts = AllNft;
  const { scrollYProgress } = useScroll();
  const { isLoading, data: info } = useQuery<IInfo>([`${params.id}`], () =>
    getInfoDetail(params.id!)
  );
  let end = false;
  useEffect(() => {
    if (isBanner) {
      axiosInstance
        .get(`/api/v1/nft/recent?project=${params.nft}`)
        .then((response) => {
          setRecentData(response.data);
        });
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      setTitle(info!.data.title);
    }
  }, [isLoading]);
  useEffect(() => {
    if (user.admin) {
      setIsAdmin(true);
    }
  }, [user]);
  useEffect(() => {
    if (recentData && recentData?.length > 1) {
      recentData.map((data, index) => {
        if (params.id === data._id) {
          setIndex(index);
        }
      });
    }
  }, [recentData, params]);
  useEffect(() => {
    if (!isLoading) {
      scrollYProgress.onChange(() => {
        if (scrollYProgress.get() >= 0.95 && !end) {
          if (
            (today.getTime() -
              new Date(info!.data.createdAt.slice(0, 10)).getTime()) /
              (1000 * 60 * 60 * 24) <=
            15
          ) {
            if (token["token"]) {
              axiosInstance.get(`/api/v1/nft/read?id=${params.id}`, {
                headers: {
                  Authorization: `Bearer ${token["token"]}`,
                },
              });
            }
          }
          end = true;
        }
      });
    }
  }, [scrollYProgress, isLoading]);
  const onClickEdit = () => {
    navigate(`/admin/?id=${params.id}`);
  };
  const onClickDelete = () => {
    if (!isLoading) {
      const alert = prompt("Please enter delete.");
      const body = { title };
      if (alert === "delete") {
        axiosInstance
          .post(`/api/v1/admin/delete/?nft=${params.id}`, body, {
            headers: {
              Authorization: `Bearer ${token["token"]}`,
            },
          })
          .then((response) => {
            navigate(`/`);
          });
      }
    }
  };

  return (
    <HomeWrapper>
      {isBanner && recentData && recentData?.length > 1 ? (
        <>
          <TopIndexContainer>
            {recentData.map((data, ind) => (
              <Link
                key={ind}
                to={`/${params.chain}/${params.nft}/${data._id}?banner=true`}
              >
                <TopIndex isIndex={ind === index} />
              </Link>
            ))}
          </TopIndexContainer>
          {index > 0 ? (
            <Link
              to={`/${params.chain}/${params.nft}/${
                recentData[index - 1]._id
              }?banner=true`}
            >
              <LeftArrow>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </LeftArrow>
            </Link>
          ) : null}
          {recentData.length - 1 > index ? (
            <Link
              to={`/${params.chain}/${params.nft}/${
                recentData[index + 1]._id
              }?banner=true`}
            >
              <RightArrow>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                </svg>
              </RightArrow>
            </Link>
          ) : null}
        </>
      ) : null}
      {isAdmin ? (
        <ButtonBox>
          <Button onClick={onClickEdit}>Edit</Button>
          <Button onClick={onClickDelete}>Delete</Button>
        </ButtonBox>
      ) : null}
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
                  {info?.data.chain +
                    " | " +
                    AllNfts[info?.data.chain.toLowerCase()!][info?.data.nft!]
                      .title}
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
