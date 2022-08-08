import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { transform } from "typescript";
import { theme } from "./../theme";

const HeaderWrapper = styled.div`
  background: linear-gradient(to right, white, #eeececb7);
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled(motion.div)`
  z-index: 99;
  margin-bottom: 0px;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5vw;
  h1 {
    font-size: 25px;
    font-weight: 600;
    letter-spacing: 4px;
  }
`;

const Nav = styled.nav`
  @media ${(props) => props.theme.device.tablet} {
    display: none;
    height: 200vh;
  }
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: space-between;
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
`;

const UserContainer = styled.div`
  @media screen and (min-width: ${(props) => props.theme.deviceSizes.tablet}) {
    div:last-child {
      display: none;
    }
  }
  display: flex;
  margin-right: 5vw;
  justify-content: flex-end;
  align-items: center;
  h1 {
    opacity: 0.2;
  }
  div {
    margin-right: 10px;
    margin-left: 10px;
  }
  svg {
    cursor: pointer;
  }
`;

const DetailContainer = styled(motion.div)`
  background-color: white;
  width: 100vw;
  display: flex;
  justify-content: center;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  height: 50vh;
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    height: calc(100vh - 60px);
    .selectedDetail {
      display: block;
    }
    font-family: "Open Sans";
  }
`;

const Detail = styled.div`
  width: 200px;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 1px;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  &:last-child {
    border-right: 2px solid rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    margin-top: 2vh;
    margin-bottom: 5vh;
    display: flex;
    justify-content: space-between;
    &:last-child {
      border-right: 0px solid rgba(0, 0, 0, 0.1);
    }
    width: 100%;
  }
`;

const DetailTitle = styled.h1`
  margin-top: 20px;
  margin-left: 15px;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 1px;
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 5vw;
    font-weight: 500;
    letter-spacing: 4px;
    margin-right: 10vw;
    width: 40vw;
  }
`;

const DetailContextContainer = styled.div`
  margin-top: 20px;
  margin-left: 15px;
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    display: none;
    width: 50vw;
  }
`;

const DetailContext = styled.h1`
  position: relative;
  margin-bottom: 20px;
  font-size: 16px;
  opacity: 0.8;
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    width: 100vw;
    font-size: 4vw;
  }
`;

const DetailText = styled(motion.div)`
  display: inline-block;
  position: relative;
`;

const Border = styled(motion.div)`
  position: absolute;
  bottom: 0px;
  height: 4px;
  background-color: black;
  opacity: 1;
`;

const Border2 = styled(motion.div)`
  position: absolute;
  bottom: -3px;
  height: 2px;
  background-color: black;
  opacity: 1;
  width: 100%;
  scale: 0.01;
  transform-origin: center left;
`;

const borderVaraints: Variants = {
  hover: {
    scale: 100,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

const textVariants: Variants = {
  hover: {
    opacity: 1,
  },
};

function Header() {
  const [index, setIndex] = useState(0);
  const [tabletIndex, setTabletIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const { scrollYProgress } = useScroll();
  useEffect(
    () =>
      scrollYProgress.onChange(() => {
        console.log();
        if (
          scrollYProgress.get() === 0 ||
          scrollYProgress.get() - scrollYProgress.getPrevious() < 0
        ) {
          setShowMenu(true);
        } else if (scrollYProgress.get() > 0.05) {
          setShowMenu(false);
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
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            onMouseEnter={() => setShow(true)}
          >
            <LogoContainer>
              <h1>
                <Link to="/">NINFO</Link>
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
                  Today
                  {index === 1 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
              <Link to="">
                <NavTitle
                  onMouseOver={() => {
                    setIndex(2);
                  }}
                  onMouseLeave={() => setIndex(0)}
                >
                  Ethereum
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
                  Solana
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
                  Klaytn
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
                  About
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
                  More
                  {index === 6 ? <Border layoutId="border" /> : null}
                </NavTitle>
              </Link>
            </Nav>
            <UserContainer>
              <div>
                <Link to="/login">
                  <svg
                    style={{ width: "30px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
                  </svg>
                </Link>
              </div>
              <div>
                <Link to="/login">
                  <svg
                    style={{ width: "25px" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
                  </svg>
                </Link>
              </div>
              <div
                onClick={() => {
                  setShow((prev) => !prev);
                  setTabletIndex(0);
                }}
              >
                <svg
                  style={{ width: "25px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                </svg>
              </div>
            </UserContainer>
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
            onClick={() => {}}
          >
            <Detail
              onMouseOver={() => {
                setIndex(1);
              }}
            >
              <DetailTitle
                onClick={() => {
                  tabletIndex === 1 ? setTabletIndex(0) : setTabletIndex(1);
                }}
              >
                Today
              </DetailTitle>
              <DetailContextContainer
                className={tabletIndex === 1 ? "selectedDetail" : ""}
              >
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      News
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(2);
              }}
            >
              <DetailTitle
                onClick={() => {
                  tabletIndex === 2 ? setTabletIndex(0) : setTabletIndex(2);
                }}
              >
                Ethereum
              </DetailTitle>
              <DetailContextContainer
                className={tabletIndex === 2 ? "selectedDetail" : ""}
              >
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      CryptoPunks
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Bored Ape Yacht Club
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                    <Border2 />
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Otherdeed for Otherside
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Azuki
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      CLONE X<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(3);
              }}
            >
              <DetailTitle
                onClick={() =>
                  tabletIndex === 3 ? setTabletIndex(0) : setTabletIndex(3)
                }
              >
                Solana
              </DetailTitle>
              <DetailContextContainer
                className={tabletIndex === 3 ? "selectedDetail" : ""}
              >
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Okay Bears
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      DeGods
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Trippin’ Ape Tribe
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Cets on Creck
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Primates
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(4);
              }}
            >
              <DetailTitle
                onClick={() =>
                  tabletIndex === 4 ? setTabletIndex(0) : setTabletIndex(4)
                }
              >
                Klaytn
              </DetailTitle>
              <DetailContextContainer
                className={tabletIndex === 4 ? "selectedDetail" : ""}
              >
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      THE META KONGZ KLAYTN
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Meta Toy DragonZ
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      Sunmiya Club Official
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      SheepFarm
                      <Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(5);
              }}
            >
              <DetailTitle
                onClick={() =>
                  tabletIndex === 5 ? setTabletIndex(0) : setTabletIndex(5)
                }
              >
                About
              </DetailTitle>
              <DetailContextContainer
                className={tabletIndex === 5 ? "selectedDetail" : ""}
              >
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      1<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      2<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      3<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
              </DetailContextContainer>
            </Detail>
            <Detail
              onMouseOver={() => {
                setIndex(6);
              }}
            >
              <DetailTitle
                onClick={() =>
                  tabletIndex === 6 ? setTabletIndex(0) : setTabletIndex(6)
                }
              >
                More
              </DetailTitle>
              <DetailContextContainer
                className={tabletIndex === 6 ? "selectedDetail" : ""}
              >
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      1<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      2<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      3<Border2 variants={borderVaraints} />
                    </DetailText>
                  </Link>
                </DetailContext>
                <DetailContext>
                  <Link to="">
                    <DetailText variants={textVariants} whileHover="hover">
                      4<Border2 variants={borderVaraints} />
                    </DetailText>
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
