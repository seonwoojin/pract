import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { AllNft } from "../AllNft";
import { axiosInstance } from "../axiosInstance";
import { breakingPoint } from "../constants/breakingPoint";
import { IUser } from "../context/DataProvider";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 200px;
  align-items: center;
  height: auto;
  min-height: 200vh;
  width: 100vw;
  font-family: "Open Sans";
  overflow-x: hidden;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    padding-top: 100px;
  }
  svg {
    fill: ${(props) => props.theme.fontColor};
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 1000px;
  height: 50px;
  font-size: 50px;
  font-weight: 600;
`;

const SettingTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 1000px;
  height: 200px;
  font-size: 40px;
  font-weight: 600;
`;

const ChainTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
  width: 1000px;
  font-size: 30px;
  font-weight: 500;
  margin: 10px 0px;
`;

const ProjectTitle = styled.div<{ isSubscribed: boolean }>`
  display: inline-block;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 4px;
  font-weight: ${(props) => (props.isSubscribed ? 600 : 400)};
  color: ${(props) => (props.isSubscribed ? "red" : null)};
  cursor: pointer;
`;

function Subscribe() {
  const allNft = AllNft;
  const [token, setToken, removeToken] = useCookies(["token"]);
  const [user, setUser] = useState<IUser>();
  const [show, setShow] = useState<string[]>([]);
  async function getUser() {
    if (token["token"] && token["token"] !== "undefined") {
      const data = await axiosInstance
        .get(`/api/v1/user/data/`, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          if (error.response.data.name === "TokenExpiredError") {
            setUser({} as IUser);
            removeToken("token");
          }
        });
    }
  }
  useEffect(() => {
    getUser();
  }, []);
  const onClickSubcribe = (project: string) => {
    if (user) {
      axiosInstance
        .get(
          `/api/v1/user/favorite/choose/?nft=${project
            .toLowerCase()
            .replaceAll(" ", "")
            .replaceAll("-", "")
            .replaceAll("`", "")}`,
          {
            headers: {
              Authorization: `Bearer ${token["token"]}`,
            },
          }
        )
        .then((response) => getUser());
    }
  };
  const onclickShow = (chain: string) => {
    if (show.includes(chain)) {
      const arr: string[] = [];
      show.forEach((prop) => {
        if (prop !== chain) {
          arr.push(prop);
        }
      });
      setShow([...arr]);
    } else {
      setShow((prev) => [...prev, chain]);
    }
  };
  console.log(show);
  return (
    <HomeContainer>
      <Title>Settings</Title>
      <SettingTitle>Subscribe</SettingTitle>
      {Object.keys(allNft).map((key, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ChainTitle>{key.toUpperCase()}</ChainTitle>
            {!show.includes(key) ? (
              <svg
                style={{ cursor: "pointer" }}
                width={"20px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                onClick={() => onclickShow(key)}
              >
                <path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z" />
              </svg>
            ) : (
              <svg
                style={{ cursor: "pointer" }}
                width={"20px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                onClick={() => onclickShow(key)}
              >
                <path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
              </svg>
            )}
          </div>
          {show.includes(key)
            ? Object.values(allNft[key])
                .sort((a, b) => {
                  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                  else if (a.title.toLowerCase() > b.title.toLowerCase())
                    return 1;
                  else return 0;
                })
                .map((value, index) => (
                  <div key={index}>
                    <ProjectTitle
                      onClick={() => onClickSubcribe(value.title)}
                      isSubscribed={
                        user
                          ? user.favoriteNft.includes(
                              value.title
                                .toLowerCase()
                                .replaceAll(" ", "")
                                .replaceAll("-", "")
                                .replaceAll("`", "")
                            )
                          : false
                      }
                    >
                      └ {value.title}
                    </ProjectTitle>
                  </div>
                ))
            : null}
        </div>
      ))}
    </HomeContainer>
  );
}

export default Subscribe;
