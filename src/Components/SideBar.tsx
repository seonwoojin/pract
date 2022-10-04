import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AllNft } from "../AllNft";
import { useRecoilState } from "recoil";
import {
  isFilterShow,
  pastString,
  projectString,
  snstString,
  subscirbeProject,
  todayString,
} from "../atom";
import { chainString } from "./../atom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../axiosInstance";
import { IUser } from "../context/DataProvider";
import { breakingPoint } from "../constants/breakingPoint";

const Wrapper = styled.div`
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    display: none;
  }
  position: fixed;
  top: 60px;
  z-index: 99;
  display: flex;
  font-family: "Open Sans", sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: calc(100vh - 60px);
  min-height: 500px;
  background: linear-gradient(
    to top,
    ${(props) => props.theme.lighter},
    ${(props) => props.theme.darker}
  );
  padding: 20px;
  padding-top: 50px;
  svg {
    :not(:nth-child(3)) {
      width: 25px;
      height: 25px;
      margin-bottom: 70px;
      opacity: 0.7;
      cursor: pointer;
      fill: ${(props) => props.theme.fontColor};
    }
  }
`;

const StarSvg = styled.svg<{ star: boolean }>`
  width: 28px;
  height: 28px;
  margin-bottom: 70px;
  opacity: 0.7;
  cursor: pointer;
  fill: ${(props) => (props.star ? "red" : props.theme.fontColor)};
`;

const DetailContainer = styled(motion.form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh-60px);
  min-height: 500px;
  width: 240px;
  background: linear-gradient(to top, white, #fafafa);
`;

const DetailTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 80px;
  font-size: 25px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 80px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.lighter};
  box-shadow: 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 40%;
  font-size: 14px;
  font-weight: 500;
  opacity: 0.7;
  color: ${(props) => props.theme.fontColor};
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
  color: ${(props) => props.theme.fontColor};
  option {
    background-color: ${(props) => props.theme.lighter};
  }
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
    width: 100px;
    font-size: 15px;
    border: none;
    font-weight: 500;
    background-color: ${(props) => props.theme.lighter};
    color: ${(props) => props.theme.fontColor};
  }
`;

function SideBar() {
  const subscribeRef = useRef<HTMLInputElement>();
  const allNfts = AllNft;
  const navigate = useNavigate();
  const [subscribeStar, setSubscribeStar] = useState(false);
  const [userSubscribeData, setUserSubscribeData] = useState<string[]>([]);
  const [show, setShow] = useRecoilState(isFilterShow);
  const [chain, setChain] = useRecoilState(chainString);
  const [project, setProject] = useRecoilState(projectString);
  const [sns, setSns] = useRecoilState(snstString);
  const [today, setToday] = useRecoilState(todayString);
  const [past, setPast] = useRecoilState(pastString);
  const [subscribe, setSubscribe] = useRecoilState<string[]>(subscirbeProject);
  const [token] = useCookies(["token"]);
  const onChangeChain = (value: string) => {
    setChain(value);
  };
  const onChangeProject = (value: string) => {
    setProject(value);
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
    if (!token["token"]) {
      setSubscribeStar(false);
    }
  }, [token]);
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
    } else if (!token["token"]) {
      setSubscribe([]);
    }
    past.setMonth(today.getMonth() - 6);
    setToday(today);
    setPast(past);
  }, [token]);
  useEffect(() => {
    if (show) {
      const checkBoxes = document.getElementsByName(
        "Subscribe"
      ) as NodeListOf<HTMLInputElement>;
      checkBoxes[0].checked = subscribeStar;
    }
  }, [subscribeStar, show]);

  return (
    <Wrapper>
      <Container>
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />{" "}
          </svg>
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
        </svg>
        <StarSvg
          star={subscribeStar}
          onClick={onClickStar}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path d="M288.1 0l86.5 164 182.7 31.6L428 328.5 454.4 512 288.1 430.2 121.7 512l26.4-183.5L18.9 195.6 201.5 164 288.1 0z" />{" "}
        </StarSvg>
        <svg
          onClick={() => setShow((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />{" "}
        </svg>
      </Container>
      <AnimatePresence>
        {show ? (
          <DetailContainer
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <DetailTitle>Filter</DetailTitle>
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
                />
                ~
                {/* <FilterDateInput
                type="date"
                defaultValue={defaultToday(past)}
                style={{ marginTop: "10px" }}
              ></FilterDateInput> */}
                <DatePicker
                  className="datePicker"
                  selected={past}
                  onChange={(date: Date) => setPast(date)}
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
          </DetailContainer>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default SideBar;
