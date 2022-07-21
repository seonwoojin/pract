import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled(motion.div)`
  margin-bottom: 0px;
  height: 90px;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 90px;
  h1 {
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 4px;
  }
`;

const Nav = styled.nav`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1px;
  a {
    width: 10%;
    height: 100%;
    div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const NavTitle = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
`;

const LanguageContainer = styled.div`
  display: flex;
  margin-right: 100px;
  justify-content: flex-end;
  align-items: center;
  h1 {
    opacity: 0.2;
  }
  div {
    margin-right: 10px;
    margin-left: 10px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;
    &:not(:first-child) {
      opacity: 0.2;
    }
  }
`;

const DetailContainer = styled(motion.div)`
  background-color: white;
  width: 100%;
  min-width: 500px;
  display: flex;
  justify-content: center;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  height: 50vh;

  div {
    &:first-child {
      grid-column-start: 4;
    }
  }
`;

const Detail = styled.div`
  min-width: 220px;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  &:last-child {
    border-right: 2px solid rgba(0, 0, 0, 0.1);
  }
`;

const DetailTitle = styled.h1`
  margin-top: 20px;
  margin-left: 15px;
`;

const DetailContextContainer = styled.div`
  margin-top: 20px;
  margin-left: 15px;
`;

const DetailContext = styled.h1`
  margin-bottom: 10px;
  font-size: 14px;
  opacity: 0.7;
  :hover {
    opacity: 1;
    span {
      border-bottom: 2px solid black;
    }
  }
`;

const Border = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  height: 4px;
  background-color: black;
  opacity: 1;
`;

const borderVaraints: Variants = {
  initial: {
    backgroundColor: "red",
  },
  animate: {
    backgroundColor: "blue",
  },
};

function Header() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const { scrollYProgress } = useScroll();
  useEffect(
    () =>
      scrollYProgress.onChange(() => {
        if (scrollYProgress.get() > 0.05) {
          setShowMenu(false);
        } else if (scrollYProgress.get() === 0) {
          setShowMenu(true);
        }
      }),
    [scrollYProgress]
  );
  return (
    <HeaderWrapper>
      <AnimatePresence>
        {showMenu ? (
          <HeaderContainer
            initial={{ opacity: 1, y: -100 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.1 } }}
            onMouseEnter={() => setShow(true)}
          >
            <LogoContainer>
              <h1>
                <Link to="">KRAFTON</Link>
              </h1>
            </LogoContainer>
            <Nav>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(1);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  About
                  {index === 1 ? (
                    <Border variants={borderVaraints} layoutId="border" />
                  ) : null}
                </NavTitle>
              </Link>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(2);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  Studios
                  {index === 2 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(3);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  Games
                  {index === 3 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(4);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  Careeres
                  {index === 4 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(5);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  IR
                  {index === 5 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(6);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  News
                  {index === 6 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
            </Nav>
            <LanguageContainer>
              <div>KO</div>
              <h1>|</h1>
              <div>EN</div>
              <h1>|</h1>
              <div>CN</div>
              <h1>|</h1>
              <div>JP</div>
            </LanguageContainer>
          </HeaderContainer>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {show ? (
          <DetailContainer
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseLeave={() => {
              setIndex(0);
              setShow(false);
            }}
          >
            <Detail
              onMouseOver={() => {
                setIndex(1);
              }}
            >
              <DetailTitle>About</DetailTitle>
              <DetailContextContainer>
                <DetailContext>
                  <Link to="">
                    <span>크래프톤 이야기</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>남겨온 흔적</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>도전의 역사</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>브랜드 리소스 센터</span>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(2);
              }}
            >
              <DetailTitle>Studios</DetailTitle>
              <DetailContextContainer>
                <DetailContext>
                  <Link to="">
                    <span>펍지 스튜디오</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>블루홀스튜디오</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>라이징윙스</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>스트라이킹 디스턴스</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>드림모션</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>언노운 월즈</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>5민랩</span>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(3);
              }}
            >
              <DetailTitle>Games</DetailTitle>
              <DetailContextContainer>
                <DetailContext>
                  <Link to="">
                    <span>PUBG:배틀그라운드</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>뉴스테이트 모바일</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>테라</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>엘리온</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>썬더 티어원</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>캐슬 크래프트</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>골프킹:월드투어</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>볼링킹</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>미니골프킹</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>로닌:더 라스트 사무라이</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>로드 투 발러:엠파이어스</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>로드 투 발러:월드워2</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>서브노티카:빌로우 제로</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>서브노티카</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>내추럴 셀렉션 2</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>토이클래시</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>스매시 레전드</span>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(4);
              }}
            >
              <DetailTitle>Careers</DetailTitle>
              <DetailContextContainer>
                <DetailContext>
                  <Link to="">
                    <span>피플</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>라이프</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>채용공고</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>자주 묻는 질문</span>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(5);
              }}
            >
              <DetailTitle>IR</DetailTitle>
              <DetailContextContainer>
                <DetailContext>
                  <Link to="">
                    <span>기업지배구조</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>공시정보</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>주가정보</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>재무정보</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>IR 활동</span>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <span>공고</span>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(6);
              }}
            >
              <DetailTitle>News</DetailTitle>
              <DetailContextContainer>
                <DetailContext>
                  <Link to="">
                    <span>보도</span>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
          </DetailContainer>
        ) : null}
      </AnimatePresence>
    </HeaderWrapper>
  );
}

export default Header;
