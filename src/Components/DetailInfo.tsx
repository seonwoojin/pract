import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { Link, Params, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { DataContext } from "../context/DataProvider";
import { IUser } from "./../context/DataProvider";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10vh;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 45vh;
  width: 80vw;

  cursor: pointer;
  :hover {
    .image {
      opacity: 1;
    }
    text-shadow: -0.5px 0 white, 0 0.5px white, 0.5px 0 white, 0 -0.5px white;
  }
`;

const InfoContext = styled.div<{ isEven: boolean }>`
  position: absolute;
  right: ${(props) => (props.isEven ? 0 : null)};
  height: 100%;
  width: 50%;
  background-color: transparent;
  padding-top: 7vh;
  padding-left: ${(props) => (props.isEven ? 0 : "5vw")};
  padding-right: ${(props) => (props.isEven ? "5vw" : 0)};
`;

const InfoContextTitle = styled.div`
  font-size: 50px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 2vh;
`;

const InfoContextText = styled.div`
  font-size: 30px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoImage = styled.div<{ url: string; isEven: boolean }>`
  position: absolute;
  right: ${(props) => (props.isEven ? null : 0)};
  z-index: -1;
  height: 100%;
  width: 60%;
  background: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;
  opacity: 0.4;
`;

const InfoCreatedAt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 25px;
  opacity: 0.9;
  width: 100%;
  height: 5vh;
`;

const EmotionWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 5vh;
  justify-content: center;
  align-items: center;
  svg {
    width: 30px;
    cursor: pointer;
    :first-child {
      fill: #d11515;
    }
    :not(:first-child) {
      margin-left: 20px;
      margin-right: 5px;
    }
  }
`;

interface IData {
  data: {
    _id: string;
    chain: string;
    nft: string;
    title: string;
    thumbnail: string;
    description: string;
    createdAt: string;
    likes: [string];
    unlikes: [string];
  };
  index: number;
  currentUser: IUser;
  params: Readonly<Params<string>>;
}

function DetailInfo({ data, index, currentUser, params }: IData) {
  const [like, setLike] = useState(false);
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [upCount, setUpCount] = useState(data.likes.length * 1);
  const [downCount, setDownCount] = useState(data.unlikes.length * 1);
  const { isLogin, user } = useContext(DataContext);
  const [token] = useCookies(["token"]);
  const navigate = useNavigate();
  let isEven: boolean = false;
  if (index % 2 === 0) {
    isEven = true;
  } else {
    isEven = false;
  }
  useEffect(() => {
    if (currentUser) {
      if (currentUser._id) {
        if (currentUser.likes.includes(data._id)) {
          setLike(true);
        }
        if (data.likes.includes(currentUser._id)) {
          setUp((props) => !props);
        }
        if (data.unlikes.includes(currentUser._id)) {
          setDown((props) => !props);
        }
      }
    }
  }, [currentUser]);

  const onClickHeart = () => {
    setLike((prev) => !prev);
    axios
      .get(`http://localhost:4000/api/v1/nft/like?post=${data._id}`, {
        headers: {
          Authorization: `Bearer ${token["token"]}`,
        },
      })
      .then((response) => {
        if (response.data === "") navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          navigate("/login");
        }
      });
  };

  const onClickRecommend = (dir: string) => {
    if (dir === "up") {
      if (up) {
        setUpCount((props) => props - 1);
      } else {
        setUpCount((props) => props + 1);
      }
      if (down) {
        setDownCount((props) => props - 1);
      }
      setUp((props) => !props);
      setDown(false);
    } else if (dir === "down") {
      if (down) {
        setDownCount((props) => props - 1);
      } else {
        setDownCount((props) => props + 1);
      }
      if (up) {
        setUpCount((props) => props - 1);
      }
      setDown((props) => !props);
      setUp(false);
    }
    axios
      .get(
        `http://localhost:4000/api/v1/nft/recommend?post=${data._id}&dir=${dir}`,
        {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        }
      )
      .then((response) => {
        if (response.data === "") navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          navigate("/login");
        }
      });
  };

  return (
    <InfoContainer>
      <Link to={`${data._id}`}>
        <InfoWrapper>
          <InfoContext isEven={isEven}>
            <InfoContextTitle>{data.title}</InfoContextTitle>
            <InfoContextText>{data.description}</InfoContextText>
          </InfoContext>
          <InfoImage
            className="image"
            isEven={isEven}
            url={data.thumbnail}
          ></InfoImage>{" "}
        </InfoWrapper>
      </Link>
      <InfoCreatedAt>{data.createdAt}</InfoCreatedAt>
      <EmotionWrapper>
        {like ? (
          <svg
            onClick={onClickHeart}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
          </svg>
        ) : (
          <svg
            onClick={onClickHeart}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
          </svg>
        )}
        {up ? (
          <svg
            onClick={() => onClickRecommend("up")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z" />
          </svg>
        ) : (
          <svg
            onClick={() => onClickRecommend("up")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M96 191.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V223.1C128 206.3 113.7 191.1 96 191.1zM512 227c0-36.89-30.05-66.92-66.97-66.92h-99.86C354.7 135.1 360 113.5 360 100.8c0-33.8-26.2-68.78-70.06-68.78c-46.61 0-59.36 32.44-69.61 58.5c-31.66 80.5-60.33 66.39-60.33 93.47c0 12.84 10.36 23.99 24.02 23.99c5.256 0 10.55-1.721 14.97-5.26c76.76-61.37 57.97-122.7 90.95-122.7c16.08 0 22.06 12.75 22.06 20.79c0 7.404-7.594 39.55-25.55 71.59c-2.046 3.646-3.066 7.686-3.066 11.72c0 13.92 11.43 23.1 24 23.1h137.6C455.5 208.1 464 216.6 464 227c0 9.809-7.766 18.03-17.67 18.71c-12.66 .8593-22.36 11.4-22.36 23.94c0 15.47 11.39 15.95 11.39 28.91c0 25.37-35.03 12.34-35.03 42.15c0 11.22 6.392 13.03 6.392 22.25c0 22.66-29.77 13.76-29.77 40.64c0 4.515 1.11 5.961 1.11 9.456c0 10.45-8.516 18.95-18.97 18.95h-52.53c-25.62 0-51.02-8.466-71.5-23.81l-36.66-27.51c-4.315-3.245-9.37-4.811-14.38-4.811c-13.85 0-24.03 11.38-24.03 24.04c0 7.287 3.312 14.42 9.596 19.13l36.67 27.52C235 468.1 270.6 480 306.6 480h52.53c35.33 0 64.36-27.49 66.8-62.2c17.77-12.23 28.83-32.51 28.83-54.83c0-3.046-.2187-6.107-.6406-9.122c17.84-12.15 29.28-32.58 29.28-55.28c0-5.311-.6406-10.54-1.875-15.64C499.9 270.1 512 250.2 512 227z" />
          </svg>
        )}
        {upCount}
        {down ? (
          <svg
            onClick={() => onClickRecommend("down")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z" />
          </svg>
        ) : (
          <svg
            onClick={() => onClickRecommend("down")}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M128 288V64.03c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 320 128 305.7 128 288zM481.5 229.1c1.234-5.092 1.875-10.32 1.875-15.64c0-22.7-11.44-43.13-29.28-55.28c.4219-3.015 .6406-6.076 .6406-9.122c0-22.32-11.06-42.6-28.83-54.83c-2.438-34.71-31.47-62.2-66.8-62.2h-52.53c-35.94 0-71.55 11.87-100.3 33.41L169.6 92.93c-6.285 4.71-9.596 11.85-9.596 19.13c0 12.76 10.29 24.04 24.03 24.04c5.013 0 10.07-1.565 14.38-4.811l36.66-27.51c20.48-15.34 45.88-23.81 71.5-23.81h52.53c10.45 0 18.97 8.497 18.97 18.95c0 3.5-1.11 4.94-1.11 9.456c0 26.97 29.77 17.91 29.77 40.64c0 9.254-6.392 10.96-6.392 22.25c0 13.97 10.85 21.95 19.58 23.59c8.953 1.671 15.45 9.481 15.45 18.56c0 13.04-11.39 13.37-11.39 28.91c0 12.54 9.702 23.08 22.36 23.94C456.2 266.1 464 275.2 464 284.1c0 10.43-8.516 18.93-18.97 18.93H307.4c-12.44 0-24 10.02-24 23.1c0 4.038 1.02 8.078 3.066 11.72C304.4 371.7 312 403.8 312 411.2c0 8.044-5.984 20.79-22.06 20.79c-12.53 0-14.27-.9059-24.94-28.07c-24.75-62.91-61.74-99.9-80.98-99.9c-13.8 0-24.02 11.27-24.02 23.99c0 7.041 3.083 14.02 9.016 18.76C238.1 402 211.4 480 289.9 480C333.8 480 360 445 360 411.2c0-12.7-5.328-35.21-14.83-59.33h99.86C481.1 351.9 512 321.9 512 284.1C512 261.8 499.9 241 481.5 229.1z" />
          </svg>
        )}
        {downCount}
      </EmotionWrapper>
    </InfoContainer>
  );
}

export default DetailInfo;
