import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";

const HomeContainer = styled(motion.div)`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 500vh;
  font-family: "Holtwood One SC";
`;

const Banner = styled.div`
  margin-top: 300px;
  margin-bottom: 400px;
  margin-left: 100px;
  margin-right: 100px;
  display: grid;
  background-image: url("https://cdn.pixabay.com/photo/2022/07/11/19/51/sea-7315960_960_720.jpg");
  background-size: cover;
  background-position: center center;

  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(4, 150px);
  justify-content: center;
  align-items: center;
  height: 45vh;
  font-size: 120px;
  div {
    &:first-child {
      grid-column: 1/4;
      grid-row: 1/2;
    }
    &:nth-child(2) {
      grid-column: 4/9;
      grid-row: 1/2;
    }
    &:nth-child(4) {
      grid-column: 1/7;
      grid-row: 2/3;
    }
    &:nth-child(5) {
      grid-column: 7/10;
      grid-row: 2/3;
    }
    &:nth-child(6) {
      grid-column: 1/5;
      grid-row: 3/4;
    }
    &:nth-child(7) {
      grid-column: 5/10;
      grid-row: 3/4;
    }
    &:nth-child(8) {
      grid-column: 1/5;
      grid-row: 4/5;
    }
    &:last-child {
      grid-column: 7/10;
      grid-row: 4/5;
    }
  }
`;

const Content = styled.div`
  height: 100%;
  background-color: white;
  display: flex;
  align-items: center;
`;

const Blank = styled.div`
  height: 100%;
  width: 100%;
  background-color: transparent;
  border: 20px solid white;
`;

const NewsContainer = styled.div`
  margin-left: 400px;
  margin-bottom: 100px;
  margin-right: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    h1 {
      margin-bottom: 30px;
      font-family: "Oswald";
      font-size: 40px;
      font-weight: 600;
    }
  }
`;

const News = styled.div`
  height: 400px;
`;

const New = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:not(:last-child) {
    margin-right: 40px;
  }
  height: 100%;
  cursor: pointer;
  :hover {
    div {
      background-size: 120%;
    }
  }
`;

const NewImage = styled(motion.div)<{ url: string }>`
  width: 100%;
  height: 70%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
`;

const NewText = styled.p`
  margin: 10px 0;
  font-family: "Oswald";
  font-size: 24px;
  line-height: 30px;
`;

const NewDate = styled.span`
  font-family: "Oswald";
  opacity: 0.4;
`;

const CareersText = styled.p`
  margin: 10px 0;
  font-family: "Oswald";
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 2px;
`;

const CareersDate = styled.span`
  font-family: "Oswald";
  opacity: 0.8;
`;

const CareersArrow = styled.span`
  font-family: "Oswald";
  font-size: 60px;
`;

const newVariants: Variants = {};

function Home() {
  const [showBlack, setShowBlack] = useState(false);
  const { scrollYProgress } = useScroll();
  console.log(scrollYProgress);
  const gradient = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgb(255, 255, 255)", "rgb(0, 0, 0)"]
  );
  return (
    <HomeContainer style={{ backgroundColor: gradient }}>
      <Banner>
        <Content>Create</Content>
        <Blank></Blank>
        <Content>the</Content>
        <Blank></Blank>
        <Content>original</Content>
        <Content>connect</Content>
        <Blank></Blank>
        <Blank></Blank>
        <Content>the</Content>
        <Blank></Blank>
        <Content>world</Content>
      </Banner>
      <NewsContainer>
        <div>
          <h1>News</h1>
        </div>
        <News>
          <New>
            <NewImage url="https://cdn.pixabay.com/photo/2022/07/06/12/58/woman-7305089_960_720.jpg"></NewImage>
            <NewText>
              배틀그라운드 모바일, 아마추어 리그 'PMOC 2022 페이즈 2`참가팀 모집
            </NewText>
            <NewDate>2022-07-21</NewDate>
          </New>
          <New>
            <NewImage url="https://cdn.pixabay.com/photo/2022/07/01/13/31/salad-dressing-7295630_960_720.jpg"></NewImage>
            <NewText>
              라이징윙스, 힐링 감성 게임 ‘캠핑 캣 패밀리’ 사전 예약 시작
            </NewText>
            <NewDate>2022-07-21</NewDate>
          </New>
          <New>
            <NewImage url="https://cdn.pixabay.com/photo/2022/06/02/00/04/dog-7236774_960_720.jpg"></NewImage>
            <NewText>딥러닝과 재미의 교점을 찾는 2년 여정을 돌아보다</NewText>
            <NewDate>2022-07-21</NewDate>
          </New>
        </News>
      </NewsContainer>
      <NewsContainer>
        <div>
          <h1>Careers</h1>
        </div>
        <News>
          <New>
            <NewImage url="https://cdn.pixabay.com/photo/2022/07/19/20/10/fire-7332958_960_720.jpg"></NewImage>
            <CareersText>PEOPLE&LIFE</CareersText>
            <CareersDate>
              자유로운 소통과 활발한 교류를 바탕으로 크래프톤 만의 문화를 만들어
              갑니다.
            </CareersDate>
            <CareersArrow>→</CareersArrow>
          </New>
          <New>
            <NewImage url="https://cdn.pixabay.com/photo/2022/06/08/16/43/sea-7250881_960_720.jpg"></NewImage>
            <CareersText>KRAFTON RECRUIT</CareersText>
            <CareersDate>크래프톤의 최신 채용공고를 살펴보세요.</CareersDate>
            <CareersArrow>→</CareersArrow>
          </New>
        </News>
      </NewsContainer>
    </HomeContainer>
  );
}

export default Home;
