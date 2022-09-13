import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { transform } from "typescript";
import { theme } from "./../theme";
import { useRecoilState } from "recoil";
import {
  chainString,
  isFilterShow,
  isLogined,
  isShow,
  pastString,
  projectString,
  snstString,
  subscirbeProject,
  todayString,
} from "./../atom";
import { useCookies } from "react-cookie";
import HeaderDetailContext from "./HeaderDetailContext";
import { AllNft } from "../AllNft";
import { useForm } from "react-hook-form";
import axios from "axios";
import { isMobileChecker } from "./../isMobileChecker";
import DatePicker from "react-datepicker";
import { axiosInstance } from "../axiosInstance";
import { IUser } from "../context/DataProvider";
import { breakingPoint } from "./../constants/breakingPoint";

const HeaderWrapper = styled.div`
  background: linear-gradient(
    to right,
    ${(props) => props.theme.lighter},
    ${(props) => props.theme.darker}
  );
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const HeaderContainer = styled(motion.div)`
  position: relative;
  z-index: 99;
  margin-bottom: 0px;
  height: 60px;
  display: flex;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  width: 5%;
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
  @media ${breakingPoint.device.tablet} {
    width: 40%;
    margin-left: 0px;
  }
`;

const UserContainer = styled.div`
  width: 15%;
  @media screen and (min-width: ${breakingPoint.deviceSizes.tablet}) {
    div:last-child,
    .detail {
      display: none;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    opacity: 1;
  }
  div {
    margin-right: 10px;
    margin-left: 10px;
    font-weight: 500;
    font-size: 20px;
    cursor: pointer;
    font-family: "Open Sans";
  }
  svg {
    cursor: pointer;
    fill: ${(props) => props.theme.fontColor};
  }
  @media ${breakingPoint.device.tablet} {
    width: 40%;
    div {
      display: none;
    }
    .detail {
      display: block;
    }
  }
`;

const Form = styled.form`
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    display: none;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  width: 60%;
  height: 70%;
  background-color: ${(props) => props.theme.lighter};
  color: ${(props) => props.theme.fontColor};
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  padding: 10px;
  margin-right: 5px;
`;

const Button = styled.button`
  width: 40px;
  height: 70%;
  border: none;
  border-radius: 2px;
  background-color: ${(props) => props.theme.search};
  cursor: pointer;
  svg {
    width: 80%;
    fill: rgba(0, 0, 0, 0.6);
  }
`;

const MobileDetail = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 60px;
  right: 0px;
  height: calc(100vh - 60px);
  width: 100%;
  background-color: #f2f2f2dd;
  padding: 20px;
  padding-top: 60px;
`;

const DetailText = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 25px;
  font-family: "Open Sans";
  padding: 10px;
  color: black;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60vw;
  height: 80px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 40%;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
`;

const FilterSelect = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 90%;
  height: 50%;
  border: none;
  font-size: 15px;
  font-weight: 600;
  background: url("https://t1.daumcdn.net/cfile/tistory/99761B495C84AA8716")
    no-repeat 100% 50%;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const FilterInput = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 20%;
  height: 50%;
  border: none;
  font-size: 15px;
  font-weight: 600;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 50%;
  font-size: 15px;
  font-weight: 600;
`;

const DateBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 50%;
  font-size: 15px;
  font-weight: 600;
  .datePicker {
    display: flex;
    text-align: center;
    width: 25vw;
    font-size: 4vw;
    border: none;
    font-weight: 500;
  }
`;

interface ISearch {
  keyword: string;
}

function Header() {
  const allNfts = AllNft;
  const subscribeRef = useRef<HTMLInputElement>();
  const isMobile = isMobileChecker();
  const [token, setToken, removeToken] = useCookies(["token", "refreshToken"]);
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const [subscribeStar, setSubscribeStar] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [userSubscribeData, setUserSubscribeData] = useState<string[]>([]);
  const [chain, setChain] = useRecoilState(chainString);
  const [project, setProject] = useRecoilState(projectString);
  const [sns, setSns] = useRecoilState(snstString);
  const [today, setToday] = useRecoilState(todayString);
  const [past, setPast] = useRecoilState(pastString);
  const [subscribe, setSubscribe] = useRecoilState<string[]>(subscirbeProject);
  const { register, handleSubmit, setValue } = useForm<ISearch>();
  const onChangeChain = (value: string) => {
    setChain(value);
  };
  const onChangeProject = (value: string) => {
    setProject(value);
  };
  const signOut = () => {
    removeToken("refreshToken");
    removeToken("token");
    window.location.replace("/");
    setIsLogin(false);
  };
  const onSearch = ({ keyword }: ISearch) => {
    navigate(`/results/${keyword}`);
  };
  const checkOnlyOne = (element: HTMLInputElement) => {
    const checkBoxes = document.getElementsByName(
      "SNS"
    ) as NodeListOf<HTMLInputElement>;
    if (element.checked !== false) {
      checkBoxes.forEach((cb) => {
        cb.checked = false;
      });
      element.checked = true;
      setSns(element.value);
    } else {
      setSns("");
    }
  };
  const onClickSubscribe = (event: HTMLInputElement) => {
    if (!token["token"]) {
      navigate("/login");
      const checkBoxes = document.getElementsByName(
        "Subscribe"
      ) as NodeListOf<HTMLInputElement>;
      checkBoxes[0].checked = false;
    } else {
      if (event.checked) {
        setSubscribe(userSubscribeData);
        setChain("");
        setProject("");
      } else {
        setSubscribe([]);
      }
      setSubscribeStar((prev) => !prev);
    }
  };
  const onClickStar = () => {
    if (!token["token"]) {
      navigate("/login");
      setShowDetail(false);
    } else {
      if (!subscribeStar) {
        setSubscribe(userSubscribeData);
      } else {
        setSubscribe([]);
      }
      setSubscribeStar((prev) => !prev);
    }
  };
  useEffect(() => {
    const today = new Date();
    const past = new Date();
    if (token["token"]) {
      axiosInstance
        .get<IUser>(`/api/v1/user/favorite`, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) => {
          setUserSubscribeData(Object.values(response.data));
        });
    }
    past.setMonth(today.getMonth() - 6);
    setToday(today);
    setPast(past);
  }, []);
  useEffect(() => {
    if (isMobile) {
      scrollYProgress.onChange(() => {
        if (
          scrollYProgress.get() === 0 ||
          scrollYProgress.get() - scrollYProgress.getPrevious() < 0
        ) {
          setShowMenu(true);
        } else if (scrollYProgress.get() > 0.05) {
          setShowMenu(false);
          setShowDetail(false);
        }
      });
    }
  }, [scrollYProgress]);
  useEffect(() => {
    if (showDetail) {
      const checkBoxes = document.getElementsByName(
        "Subscribe"
      ) as NodeListOf<HTMLInputElement>;
      checkBoxes[0].checked = subscribeStar;
    }
  }, [subscribeStar, showDetail]);

  return (
    <HeaderWrapper>
      <AnimatePresence>
        {showMenu ? (
          <HeaderContainer
            initial={{ opacity: 1, y: -100 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
          >
            {/* <div
          style={{ cursor: "pointer", position: "absolute", top: 15, left: 25 }}
        >
          <svg
            style={{ width: "25px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </svg>
        </div> */}
            <LogoContainer>
              <h1>
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  NINFO
                </Link>
              </h1>
            </LogoContainer>
            <Form onSubmit={handleSubmit(onSearch)}>
              <Input
                {...register("keyword", { required: true })}
                placeholder="Search"
              ></Input>
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                </svg>
              </Button>
            </Form>
            {isLogin ? (
              <UserContainer>
                <div onClick={() => signOut()}>
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
                  <Link to="/admin">
                    <svg
                      style={{ width: "25px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
                    </svg>
                  </Link>
                </div>
                <div onClick={() => signOut()}>Sign out</div>
                <div className="detail">
                  <svg
                    style={{
                      fill: subscribeStar ? "#b82828" : "black",
                      width: "25px",
                      height: "25px",
                    }}
                    onClick={onClickStar}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
                <div
                  onClick={() => setShowDetail((prev) => !prev)}
                  className="detail"
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
            ) : (
              <UserContainer>
                <div>
                  <Link to="/login">Sign in</Link>
                </div>
                <div className="detail">
                  <svg
                    style={{
                      fill: subscribeStar ? "#b82828" : "black",
                      width: "25px",
                      height: "25px",
                    }}
                    onClick={onClickStar}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
                <div
                  onClick={() => setShowDetail((prev) => !prev)}
                  className="detail"
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
            )}
          </HeaderContainer>
        ) : null}
      </AnimatePresence>
      {isMobile && showDetail ? (
        <MobileDetail
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
        >
          {isLogin ? (
            <DetailText onClick={() => signOut()}>Sign out</DetailText>
          ) : (
            <>
              <DetailText onClick={() => setShowDetail(false)}>
                <Link to="/login">Sign in</Link>
              </DetailText>
              <DetailText onClick={() => setShowDetail(false)}>
                <Link to="/join">Sign up</Link>
              </DetailText>
            </>
          )}
          <DetailText>Filter</DetailText>
          <FilterContainer>
            <FilterTitle>Chain</FilterTitle>
            <FilterSelect
              onChange={(event) => {
                onChangeChain(event.currentTarget.value);
                setProject("");
              }}
              value={chain}
            >
              <option value="">All</option>
              <option value="eth">ETH</option>
              <option value="sol">SOL</option>
              <option value="klay">KLAY</option>
            </FilterSelect>
          </FilterContainer>
          <FilterContainer>
            <FilterTitle>Project</FilterTitle>
            <FilterSelect
              onChange={(event) => onChangeProject(event.currentTarget.value)}
              value={project}
            >
              <option value="">All</option>
              {chain === ""
                ? null
                : Object.values(allNfts[chain]).map((data) => (
                    <option key={data.title} value={data.title}>
                      {data.title}
                    </option>
                  ))}
            </FilterSelect>
          </FilterContainer>
          <FilterContainer>
            <FilterTitle>Channel</FilterTitle>
            <CheckBoxWrapper>
              <div>Twitter</div>
              <FilterInput
                type="checkbox"
                value="twitter"
                name="SNS"
                onClick={(event) => checkOnlyOne(event.currentTarget)}
              ></FilterInput>
              <div>Discord</div>
              <FilterInput
                type="checkbox"
                value="discord"
                name="SNS"
                onClick={(event) => checkOnlyOne(event.currentTarget)}
              ></FilterInput>
            </CheckBoxWrapper>
          </FilterContainer>
          <FilterContainer>
            <FilterTitle>Period</FilterTitle>
            <DateBoxWrapper>
              <DatePicker
                className="datePicker"
                selected={today}
                onChange={(date: Date) => setToday(date)}
                disabledKeyboardNavigation
                onFocus={(e) => e.target.blur()}
              />
              ~
              <DatePicker
                className="datePicker"
                selected={past}
                onChange={(date: Date) => setPast(date)}
                disabledKeyboardNavigation
                onFocus={(e) => e.target.blur()}
              />
            </DateBoxWrapper>
          </FilterContainer>
          <FilterContainer>
            <FilterTitle>Subscribe</FilterTitle>
            <CheckBoxWrapper style={{ justifyContent: "space-evenly" }}>
              <div>Subscribe</div>
              <FilterInput
                ref={(element) => {
                  if (element !== null) {
                    subscribeRef.current = element;
                  }
                }}
                type="checkbox"
                value="subscribe"
                name="Subscribe"
                onClick={(event) => onClickSubscribe(event.currentTarget)}
              ></FilterInput>
            </CheckBoxWrapper>
          </FilterContainer>
        </MobileDetail>
      ) : null}
    </HeaderWrapper>
  );
}

export default Header;
