import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AllNft } from "../AllNft";
import { IInfo } from "./../Routes/Home";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useInterval from "../useInterval";
import { isFilterShow, isSelected } from "./../atom";
import { useRecoilState, useRecoilValue } from "recoil";
import useWindowDimensions from "../useWindowDimensions";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin-bottom: 50px;
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
  padding-top: 50px;
  margin-bottom: 20px;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  width: 400px;
  height: 400px;
  margin-right: 20px;
  cursor: pointer;
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

const InfoImageContext = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  padding: 20px;
  overflow: hidden;
`;

const InfoImageHashTag = styled.div`
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
  background-color: white;
`;

const InfoMainLogo = styled.div<{ logourl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${(props) => props.logourl});
  background-position: center center;
  background-size: cover;
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
`;

const InfoMainSubText = styled.div`
  padding-left: 10px;
  height: 55%;
  width: 100%;
  h1 {
    margin-bottom: 5px;
    opacity: 0.8;
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

function HomeInfo({ nftData }: IProps) {
  const AllNfts = AllNft;
  const [detail, setDetail] = useState(false);
  const [hover, setHover] = useState("");
  const [hoveredId, sethoverdId] = useRecoilState(isSelected);
  const [indexArray, setIndexArray] = useState<number[]>([]);
  const { height, width } = useWindowDimensions();
  const [offset, setOffset] = useState(5);
  const [maxIndex, setMaxIndex] = useState(1);
  const isShow = useRecoilValue(isFilterShow);
  useInterval(() => {
    setDetail((prev) => !prev);
  }, 8000);

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
  return (
    <>
      {indexArray.map((i) => (
        <InfoContainer key={i}>
          <InfoWrapper>
            {Object.values(nftData?.data!)
              .slice(i * offset, (i + 1) * offset)
              .map((info, index) => (
                <Info
                  key={info._id + index}
                  onMouseOver={() => {
                    setHover(info._id);
                    sethoverdId(info._id);
                  }}
                  onMouseOut={() => setHover("")}
                >
                  {hover === info._id ? (
                    <InfoHover
                      layoutId={info._id + index}
                      transition={{
                        type: "tween",
                        duration: 0.5,
                      }}
                    >
                      <InfoImage url={info.thumbnail} detail={true}>
                        <InfoImageContext>{info.title}</InfoImageContext>
                        <InfoImageHashTag>#eth #event</InfoImageHashTag>
                      </InfoImage>
                      <InfoMain>
                        <InfoMainLogo
                          logourl={
                            AllNfts[info.chain.toLowerCase()][info.nft].logourl
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
                      layoutId={info._id + index}
                      transition={{ type: "tween", duration: 0.5 }}
                      ishovered={info._id === hoveredId ? "true" : "false"}
                    >
                      <InfoImage url={info.thumbnail} detail={detail}>
                        <InfoImageContext>{info.title}</InfoImageContext>
                        <InfoImageHashTag>#eth #event</InfoImageHashTag>
                      </InfoImage>
                      <InfoMain>
                        <InfoMainLogo
                          logourl={
                            AllNfts[info.chain.toLowerCase()][info.nft].logourl
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
                </Info>
              ))}
          </InfoWrapper>
        </InfoContainer>
      ))}
    </>
  );
}

export default HomeInfo;
