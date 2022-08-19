import styled, { keyframes } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { AllNft } from "./../AllNft";
import PageNotFound from "./PageNotFound";
import { title } from "process";
import { NftChecker } from "./../NftChecker";
import { useQuery } from "@tanstack/react-query";
import { getNftInfo, IData } from "../axios";
import nft from "./../api/v1/nft/index";
import { transform } from "typescript";
import DetailInfo from "../Components/DetailInfo";
import axios from "axios";
import { useCookies } from "react-cookie";
import { response } from "./../constnats/response";
import { useContext, useEffect, useState } from "react";
import { IUser } from "./../context/DataProvider";
import { getUser } from "./../axios";
const starAnim = keyframes`
  0% {
    scale: 1;
  }
  50% {
    scale: 1.2;
  }
  100% {
    scale: 1;
  }
`;

const HomeWrapper = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100vw;
  font-family: "Open Sans";
  overflow-x: hidden;
`;

const Title = styled.div<{ favorite: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  height: 10vh;
  font-size: 90px;
  font-weight: 600;
  margin-bottom: 10vh;
  letter-spacing: 3px;
  font-family: "Oswald";
  svg {
    width: 40px;
    cursor: pointer;
    :hover {
      animation: ${starAnim} 2s infinite linear;
    }
  }
`;

interface IUserData {
  data: IUser;
}

function Info() {
  const params = useParams();
  const navigate = useNavigate();
  const [favoirte, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IData>();
  const [user, setUser] = useState<IUser>();
  const [token] = useCookies(["token"]);
  const allNft = AllNft;
  const check = NftChecker(params.chain, params.nft);
  const { isLoading: isLoadingUser, data: userData } = useQuery<IUserData>(
    [`${params.nft}user`],
    () => getUser(token["token"])
  );

  useEffect(() => {
    if (!isLoadingUser) {
      setUser(userData?.data);
    }
  }, [isLoadingUser]);
  useEffect(() => {
    async function getNft() {
      if (token["token"] && token["token"] !== "undefined") {
        const data = await axios
          .get(`http://localhost:4000/api/v1/nft/?nft=${params.nft}`)
          .then((response) => {
            setData(response.data);
            setIsLoading(false);
          });
      }
    }
    getNft();
  }, [params]);

  const onClick = () => {
    setFavorite((prev) => !prev);
    axios
      .get(
        `http://localhost:4000/api/v1/user/favorite/choose?nft=${params.nft}`,
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

  if (check === false) {
    return <PageNotFound />;
  }
  return (
    <HomeWrapper key={params.nft}>
      <Title favorite={favoirte}>
        {allNft[params.chain!][params.nft!].title}{" "}
        {favoirte ? (
          <svg
            style={{ fill: "red" }}
            onClick={() => onClick()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
          </svg>
        ) : (
          <svg
            style={{ fill: "red" }}
            onClick={() => onClick()}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path d="M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z" />
          </svg>
        )}
      </Title>
      {isLoading || isLoadingUser
        ? null
        : Object.values(data!).map((nft, index) => (
            <DetailInfo
              key={nft?._id}
              data={nft!}
              index={index}
              currentUser={user!}
              params={params}
            />
          ))}
    </HomeWrapper>
  );
}

export default Info;
