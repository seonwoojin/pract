import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AllNft } from "../AllNft";
import { IInfo } from "./../Routes/Home";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useInterval from "../useInterval";
import {
  chainString,
  isFilterShow,
  isSelected,
  pastString,
  projectString,
  snstString,
  subscirbeProject,
  todayString,
} from "./../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import useWindowDimensions from "../useWindowDimensions";
import { Link } from "react-router-dom";
import { breakingPoint } from "../constants/breakingPoint";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin-bottom: 50px;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    margin-bottom: 0px;
  }
`;

const InfoTitle = styled.div`
  display: flex;
  font-size: 50px;
  font-weight: 600;

  h1 {
    border-top-right-radius: 15px;
    padding: 15px;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
  margin-bottom: 20px;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 400px;
  margin-right: 20px;
  cursor: pointer;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 80vw;
    height: 80vw;
    margin-right: 0px;
  }
`;

const InfoHover = styled(motion.div)`
  z-index: 98;
  position: absolute;
  top: -20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
  width: 600px;
  height: 600px;
  margin-right: 20px;
  cursor: pointer;
`;

const InfoNonHover = styled(motion.div)<{ ishovered: string }>`
  width: 100%;
  height: 100%;
  z-index: ${(props) => (props.ishovered === "true" ? 98 : 0)};
`;

const InfoImage = styled.div<{ url: string; detail: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  background-image: url(${(props) => props.url});
  background-blend-mode: multiply;
  background-position: center center;
  background-size: cover;
  font-family: sans-serif;
  color: ${(props) => (props.detail ? "white" : "transparent")};
  background-color: ${(props) =>
    props.detail ? "rgba(0, 0, 0, 0.8)" : "transparent"};
  transition: all 1s ease 0.1s;
`;

const InfoImageContext = styled(motion.div)`
  display: flex;
  width: 100%;
  height: 80%;
  padding: 20px;
  overflow: hidden;
`;

const InfoImageHashTag = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 10px;
  opacity: 0.9;
`;

const InfoMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
  padding: 10px;
  background-color: ${(props) => props.theme.lighter};
`;

const InfoMainLogo = styled.div<{ logourl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${(props) => props.logourl});
  background-position: center center;
  background-size: cover;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 30px;
    height: 30px;
    margin-top: 10px;
  }
`;

const InfoMainText = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 100%;
`;

const InfoMainTitle = styled.div`
  padding: 10px;
  height: 45%;
  width: 100%;
  div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    font-weight: 600;
    font-size: 16px;
  }
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    margin-bottom: 10px;
    div {
      font-size: 14px;
    }
  }
`;

const InfoMainSubText = styled.div`
  padding-left: 10px;
  height: 55%;
  width: 100%;
  h1 {
    margin-bottom: 5px;
    opacity: 0.8;
  }
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    font-size: 14px;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const IndexBox = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  :not(:last-child) {
    margin-right: 10px;
  }
  width: 50px;
  height: 4px;
  cursor: pointer;
  border-bottom: ${(props) =>
    props.selected
      ? "4px solid rgba(0, 0, 0, 1)"
      : "4px solid rgba(0, 0, 0, 0.2)"};
`;

const InfoNext = styled.div`
  width: 30px;
  height: 350px;
  background-color: black;
  opacity: 0.2;
  :hover {
    opacity: 0.8;
  }
`;

interface IProps {
  nftData: IInfo;
}

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

const hoverVariants: Variants = {
  initial: {
    y: -100,
    scale: 0.6,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
  exit: {
    scale: 0.6,
  },
};

const nonHoverVariants: Variants = {
  initial: {
    scale: 1.5,
  },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};

function HomeInfo({ nftData }: IProps) {
  const AllNfts = AllNft;
  const [detail, setDetail] = useState(false);
  const [hover, setHover] = useState("");
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>[]>(
    []
  );
  const [data, setData] = useState<IData[]>(Object.values(nftData?.data));
  console.log(data);
  const [hoveredId, sethoverdId] = useRecoilState(isSelected);
  const [indexArray, setIndexArray] = useState<number[]>([]);
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState(1);
  const [maxIndex, setMaxIndex] = useState(1);
  const isShow = useRecoilValue(isFilterShow);
  const chain = useRecoilValue(chainString);
  const project = useRecoilValue(projectString);
  const sns = useRecoilValue(snstString);
  const today = useRecoilValue(todayString);
  const past = useRecoilValue(pastString);
  const subscribe = useRecoilValue(subscirbeProject);

  const filter = (info: IData) => {
    let chainBool: boolean = true;
    let projectBool: boolean = true;
    let snsBool: boolean = true;
    let dateBool: boolean = true;
    let subscribeBool: boolean = true;
    const date = new Date(Date.parse(info.createdAt)).getTime();
    if (chain !== "") {
      chainBool = info.chain === chain.toUpperCase();
    }
    if (project !== "") {
      projectBool =
        info.nft ===
        project
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .replaceAll("`", "")
          .toLowerCase();
    }
    if (sns !== "") {
      snsBool = info.SNS === sns;
    }
    if (today.getTime() - date < 0 || date - past.getTime() < 0) {
      dateBool = false;
    }
    if (subscribe.length !== 0) {
      subscribeBool = subscribe.includes(
        info.nft
          .replaceAll(" ", "")
          .replaceAll("-", "")
          .replaceAll("`", "")
          .toLowerCase()
      );
    }
    return chainBool && projectBool && snsBool && dateBool && subscribeBool;
  };

  useInterval(() => {
    setDetail((prev) => !prev);
  }, 8000);

  useEffect(() => setData(Object.values(nftData.data)), [nftData]);

  useEffect(() => {
    const prevArray: number[] = [];
    for (let i = 0; i < maxIndex; i++) {
      prevArray.push(i);
    }
    setIndexArray([...prevArray]);
  }, [maxIndex]);
  useEffect(() => {
    if (width >= 2200) {
      setOffset(5);
    } else if (width >= 1800) {
      setOffset(4);
    } else if (width >= 1400) {
      setOffset(3);
    } else if (width >= 1000) {
      setOffset(2);
    } else if (width >= 600) {
      setOffset(1);
    }
    if (isShow && offset != 1) {
      setOffset((prev) => prev - 1);
    }
  }, [width, isShow]);

  useEffect(() => {
    setMaxIndex(Math.ceil(Object.values(nftData?.data!).length / offset));
  }, [offset]);

  useEffect(() => {
    setData(Object.values(nftData?.data).filter(filter));
  }, [chain, project, sns, today, past, subscribe, nftData]);
  return (
    <>
      {indexArray.map((i) => (
        <InfoContainer key={i}>
          <InfoWrapper>
            {data.slice(i * offset, (i + 1) * offset).map((info, index) => (
              <Link
                key={info._id}
                to={`/${info.chain}/${info.nft}/${info._id}`}
              >
                <Info key={info._id + index}>
                  <AnimatePresence>
                    {hover === info._id ? (
                      <InfoHover
                        variants={hoverVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        onMouseLeave={() => {
                          setHover("");
                          timeoutId.map((id) => clearTimeout(id));
                        }}
                      >
                        <InfoImage url={info.thumbnail} detail={true}>
                          <InfoImageContext>{info.title}</InfoImageContext>
                          <InfoImageHashTag>#eth #event</InfoImageHashTag>
                        </InfoImage>
                        <InfoMain>
                          <InfoMainLogo
                            logourl={
                              AllNfts[info.chain.toLowerCase()][info.nft]
                                .logourl
                            }
                          ></InfoMainLogo>
                          <InfoMainText>
                            <InfoMainTitle>
                              <div>{info.title}</div>
                            </InfoMainTitle>
                            <InfoMainSubText>
                              <h1>
                                {
                                  AllNfts[info.chain.toLowerCase()][info.nft]
                                    .title
                                }
                              </h1>
                              <h1>{info.createdAt}</h1>
                            </InfoMainSubText>
                          </InfoMainText>
                        </InfoMain>
                      </InfoHover>
                    ) : (
                      <InfoNonHover
                        variants={nonHoverVariants}
                        initial="initial"
                        animate="animate"
                        ishovered={info._id === hoveredId ? "true" : "false"}
                        onMouseLeave={() => {
                          setHover("");
                          timeoutId.map((id) => clearTimeout(id));
                        }}
                      >
                        <InfoImage
                          onMouseEnter={() => {
                            setTimeoutId((prev) => [
                              ...prev,
                              setTimeout(() => {
                                setHover(info._id);
                                sethoverdId(info._id);
                              }, 500),
                            ]);
                          }}
                          onMouseLeave={() => {
                            setHover("");
                            timeoutId.map((id) => clearTimeout(id));
                          }}
                          url={info.thumbnail}
                          detail={detail}
                        >
                          <InfoImageContext>{info.title}</InfoImageContext>
                          <InfoImageHashTag>#eth #event</InfoImageHashTag>
                        </InfoImage>
                        <InfoMain>
                          <InfoMainLogo
                            logourl={
                              AllNfts[info.chain.toLowerCase()][info.nft]
                                .logourl
                            }
                          ></InfoMainLogo>
                          <InfoMainText>
                            <InfoMainTitle>
                              <div>{info.title}</div>
                            </InfoMainTitle>
                            <InfoMainSubText>
                              <h1>
                                {
                                  AllNfts[info.chain.toLowerCase()][info.nft]
                                    .title
                                }
                              </h1>
                              <h1>{info.createdAt}</h1>
                            </InfoMainSubText>
                          </InfoMainText>
                        </InfoMain>
                      </InfoNonHover>
                    )}
                  </AnimatePresence>
                </Info>
              </Link>
            ))}
          </InfoWrapper>
        </InfoContainer>
      ))}
    </>
  );
}

export default HomeInfo;
