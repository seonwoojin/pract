import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { AllNft } from "../AllNft";
import { axiosInstance } from "../axiosInstance";
import { breakingPoint } from "../constants/breakingPoint";
import { IUser } from "../context/DataProvider";
import { useRecoilState } from "recoil";
import { onlyDark, recentPost } from "../atom";
import { blinkPost } from "./../atom";

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

const SettingWrapper = styled.div`
  width: 1000px;
  height: auto;
  border: 1px solid ${(props) => props.theme.fontColor};
  padding: 10px;
  padding-bottom: 0px;
`;

const SubTilteWrapper = styled.div`
  margin-bottom: 30px;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    cursor: pointer;
  }
  :hover {
    div {
      font-weight: 600;
    }
  }
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 30px;
  width: 1000px;
  font-size: 30px;
  font-weight: 500;
  margin: 10px 0px;
  cursor: pointer;
  :hover {
    font-weight: 600;
  }
`;

const ProjectTitle = styled.div<{ isSubscribed: boolean }>`
  display: inline-block;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  font-weight: ${(props) => (props.isSubscribed ? 400 : 400)};
  color: ${(props) => (props.isSubscribed ? "red" : null)};
  cursor: pointer;
  :hover {
    font-weight: 600;
  }
`;

const Input = styled.input`
  text-align: center;
  width: 30px;
  height: 30px;
  border: none;
  background-color: inherit;
  color: inherit;
  font-size: 20px;
  margin-right: 0px;
`;

const Div = styled.div<{ isOnlyDark: boolean }>`
  opacity: ${(props) => (props.isOnlyDark ? 0.2 : 1)}; ;
`;

function Setting() {
  const allNft = AllNft;
  const [token, setToken, removeToken] = useCookies(["token"]);
  const [user, setUser] = useState<IUser>();
  const [show, setShow] = useState<string[]>([]);
  const [blinkTime, setBlinkTime] = useRecoilState(blinkPost);
  const [blinkValue, setBlinkValue] = useState(blinkTime.toString());
  const [recentPostDate, setRecentPostDate] = useRecoilState(recentPost);
  const [recentValue, setRecentValue] = useState(recentPostDate.toString());
  const [onlyInfoDark, setOnlyInfoDark] = useRecoilState(onlyDark);
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
  useEffect(() => {
    localStorage.setItem("blinkTime", String(blinkTime));
    localStorage.setItem("recentPostDate", String(recentPostDate));
    localStorage.setItem("onlyInfoDark", String(onlyInfoDark));
  }, [blinkTime, recentPostDate, onlyInfoDark]);
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

  return (
    <HomeContainer>
      <Title>Settings</Title>
      <SettingTitle>Subscribe</SettingTitle>
      <SettingWrapper>
        {Object.keys(allNft).map((key, index) => (
          <SubTilteWrapper key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <SubTitle onClick={() => onclickShow(key)}>
                {key.toUpperCase()}
              </SubTitle>
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
                    if (a.title.toLowerCase() < b.title.toLowerCase())
                      return -1;
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
          </SubTilteWrapper>
        ))}
      </SettingWrapper>
      <SettingTitle>Project Information</SettingTitle>
      <SettingWrapper>
        <SubTilteWrapper>
          <OptionContainer>
            <SubTitle>깜빡임 시간</SubTitle>
            <Div
              isOnlyDark={onlyInfoDark && blinkTime > 0}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Input
                disabled={onlyInfoDark && blinkTime > 0}
                value={blinkValue}
                onChange={(event) => {
                  setBlinkValue(event.currentTarget.value);
                }}
                onBlur={(event) => {
                  if (blinkValue === "") {
                    setBlinkValue("0");
                    setBlinkTime(0);
                  } else {
                    if (parseInt(blinkValue) >= 30) {
                      setBlinkTime(30);
                      setBlinkValue("30");
                    } else if (parseInt(blinkValue) > 0) {
                      setBlinkTime(parseInt(blinkValue));
                      setOnlyInfoDark(false);
                    } else if (parseInt(blinkValue) <= 0) {
                      setOnlyInfoDark(true);
                      setBlinkTime(0);
                      setBlinkValue("0");
                    }
                  }
                }}
                type={"number"}
              ></Input>
              <h1> seconds</h1>
            </Div>
          </OptionContainer>
        </SubTilteWrapper>
        <SubTilteWrapper>
          <OptionContainer>
            <SubTitle>Only Detail</SubTitle>
            {onlyInfoDark ? (
              <svg
                onClick={() => setOnlyInfoDark((prev) => !prev)}
                width={"40px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M288 256C288 202.1 330.1 160 384 160C437 160 480 202.1 480 256C480 309 437 352 384 352C330.1 352 288 309 288 256zM0 256C0 149.1 85.96 64 192 64H384C490 64 576 149.1 576 256C576 362 490 448 384 448H192C85.96 448 0 362 0 256zM48 256C48 335.5 112.5 400 192 400H384C463.5 400 528 335.5 528 256C528 176.5 463.5 112 384 112H192C112.5 112 48 176.5 48 256z" />{" "}
              </svg>
            ) : (
              <svg
                width={"40px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                onClick={() => setOnlyInfoDark((prev) => !prev)}
              >
                <path d="M384 128c70.7 0 128 57.3 128 128s-57.3 128-128 128H192c-70.7 0-128-57.3-128-128s57.3-128 128-128H384zM576 256c0-106-86-192-192-192H192C86 64 0 150 0 256S86 448 192 448H384c106 0 192-86 192-192zM192 352c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96z" />
              </svg>
            )}
          </OptionContainer>
        </SubTilteWrapper>
        <SubTilteWrapper>
          <OptionContainer>
            <SubTitle>최신 게시글 기준</SubTitle>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Input
                value={recentValue}
                onChange={(event) => {
                  setRecentValue(event.currentTarget.value);
                }}
                onBlur={(event) => {
                  if (recentValue === "") {
                    setRecentValue("0");
                    setRecentPostDate(0);
                  } else {
                    if (parseInt(recentValue) >= 60) {
                      setRecentPostDate(60);
                      setRecentValue("60");
                    } else if (parseInt(recentValue) > 0) {
                      setRecentPostDate(parseInt(recentValue));
                    } else if (parseInt(recentValue) <= 0) {
                      setRecentPostDate(0);
                      setRecentValue("0");
                    }
                  }
                }}
                type={"number"}
              ></Input>
              <h1>days</h1>
            </div>
          </OptionContainer>
        </SubTilteWrapper>
      </SettingWrapper>
    </HomeContainer>
  );
}

export default Setting;
