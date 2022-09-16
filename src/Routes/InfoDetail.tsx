import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInfoDetail } from "./../axios";
import { useContext, useEffect, useState } from "react";
import { AllNft } from "../AllNft";
import { breakingPoint } from "../constants/breakingPoint";
import { DataContext } from "../context/DataProvider";
import { axiosInstance } from "../axiosInstance";
import { useCookies } from "react-cookie";
import { response } from "./../constants/response";

const HomeWrapper = styled.div`
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
  const [title, setTitle] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { user } = useContext(DataContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token] = useCookies(["token"]);
  const AllNfts = AllNft;
  const { isLoading, data: info } = useQuery<IInfo>([`${params.id}`], () =>
    getInfoDetail(params.id!)
  );
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
