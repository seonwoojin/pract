import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AllNft } from "../AllNft";
import { IInfo } from "../Routes/Home";
import { AnimatePresence, motion, Variants } from "framer-motion";
import useInterval from "../useInterval";

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
  z-index: 99;
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
  z-index: ${(props) => (props.ishovered === "true" ? 99 : 0)};
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
  nft: string;
}

function Homcopy({ nftData, nft }: IProps) {
  let maxIndex = 0;
  const AllNfts = AllNft;
  const offset = 4;
  const [sliceFirst, setSliceFirst] = useState(0);
  const [sliceSecond, setSliceSecond] = useState(0);
  const [index, setIndex] = useState(0);
  const [indexLoading, setIndexLoading] = useState(true);
  const [indexArray, setIndexArray] = useState<number[]>([]);
  const [detail, setDetail] = useState(false);
  const [hover, setHover] = useState("");
  const [hoveredId, sethoverdId] = useState("");
  useInterval(() => {
    setDetail((prev) => !prev);
  }, 8000);

  maxIndex = Math.floor(
    Object.values(nftData?.data!).filter((infos) => infos.nft === nft).length /
      offset
  );

  useEffect(() => {
    if (maxIndex === 0) {
      setSliceFirst(0);
      setSliceSecond(offset - 1);
    } else if (index === maxIndex) {
      setSliceFirst(
        Object.values(nftData?.data!).filter((infos) => infos.nft === nft)
          .length - offset
      );
      setSliceSecond(
        Object.values(nftData?.data!).filter((infos) => infos.nft === nft)
          .length
      );
    } else {
      setSliceFirst(offset * index);
      setSliceSecond(offset * index + offset);
    }
  }, [index]);

  useEffect(() => {
    const prevArray: number[] = [];
    for (let i = 0; i < maxIndex + 1; i++) {
      prevArray.push(i + 1);
    }
    setIndexArray([...prevArray]);
    setIndexLoading(false);
  }, []);
  const onClickNext = () => {
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const onClickIndex = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <InfoContainer>
      <InfoTitle>
        <h1>{AllNfts["eth"][nft].title}</h1>
      </InfoTitle>
      <InfoWrapper>
        {Object.values(nftData?.data!)
          .filter((infos) => infos.nft === nft)
          .slice(sliceFirst, sliceSecond)
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
                      logourl={AllNfts[info.chain.toLowerCase()][nft].logourl}
                    ></InfoMainLogo>
                    <InfoMainText>
                      <InfoMainTitle>
                        <div>{info.title}</div>
                      </InfoMainTitle>
                      <InfoMainSubText>
                        <h1>{AllNfts["eth"][nft].title}</h1>
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
                      logourl={AllNfts[info.chain.toLowerCase()][nft].logourl}
                    ></InfoMainLogo>
                    <InfoMainText>
                      <InfoMainTitle>
                        <div>{info.title}</div>
                      </InfoMainTitle>
                      <InfoMainSubText>
                        <h1>{AllNfts["eth"][nft].title}</h1>
                        <h1>{info.createdAt}</h1>
                      </InfoMainSubText>
                    </InfoMainText>
                  </InfoMain>
                </InfoNonHover>
              )}
            </Info>
          ))}
        <InfoNext onClick={onClickNext}></InfoNext>
      </InfoWrapper>
      <IndexContainer>
        {indexLoading
          ? null
          : indexArray.map((allindex) =>
              allindex === index + 1 ? (
                <IndexBox
                  onClick={() => onClickIndex(allindex - 1)}
                  key={allindex}
                  selected={true}
                ></IndexBox>
              ) : (
                <IndexBox
                  onClick={() => onClickIndex(allindex - 1)}
                  key={allindex}
                  selected={false}
                ></IndexBox>
              )
            )}
      </IndexContainer>
    </InfoContainer>
  );
}

export default Homcopy;
