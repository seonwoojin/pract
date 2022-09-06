import { AnimatePresence, motion, Variants, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { transform } from "typescript";
import { theme } from "./../theme";
import { useRecoilState } from "recoil";
import { isLogined, isShow } from "./../atom";
import { useCookies } from "react-cookie";
import HeaderDetailContext from "./HeaderDetailContext";
import { AllNft } from "../AllNft";
import { useForm } from "react-hook-form";
import axios from "axios";

const HeaderWrapper = styled.div`
  background: linear-gradient(to right, white, #eeecec);
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
  @media ${(props) => props.theme.device.tablet} {
    width: 20%;
  }
`;

const UserContainer = styled.div`
  width: 15%;
  @media screen and (min-width: ${(props) => props.theme.deviceSizes.tablet}) {
    div:last-child {
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
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 40%;
    div {
      :nth-child(3) {
        display: none;
      }
    }
  }
`;

const Form = styled.form`
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
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
  background-color: white;
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
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  svg {
    width: 80%;
    fill: rgba(0, 0, 0, 0.6);
  }
`;

interface ISearch {
  keyword: string;
}

function Header() {
  const [token, setToken, removeToken] = useCookies(["token", "refreshToken"]);
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<ISearch>();
  const signOut = () => {
    removeToken("refreshToken");
    removeToken("token");
    navigate("/");
    setIsLogin(false);
  };
  const onSearch = ({ keyword }: ISearch) => {
    navigate(`/results/${keyword}`);
  };
  return (
    <HeaderWrapper>
      <HeaderContainer>
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
            <Link to="/">NINFO</Link>
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
            <div>
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
            <div>
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
    </HeaderWrapper>
  );
}

export default Header;
