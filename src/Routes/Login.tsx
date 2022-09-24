import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { useRecoilValue } from "recoil";
import { isLogined } from "./../atom";
import { response } from "../constants/response";
import { axiosInstance } from "../axiosInstance";
import { breakingPoint } from "../constants/breakingPoint";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Open Sans";
`;

const Title = styled.div`
  width: 85%;
  height: 5vh;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 30%;
  border-radius: 20px;
  //box-shadow: 5px 5px 10px -5px;
  background-color: transparent;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    width: 80vw;
    height: 50vh;
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  a {
    opacity: 0.8;
  }
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Input = styled.input`
  height: 9%;
  width: 85%;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-left: 10px;
  font-size: 15px;
`;

const Button = styled.button`
  border: none;
  width: 30%;
  min-width: 80px;
  height: 35px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-top: 30px;
  background-color: #19191a;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  color: red;
  font-weight: 600;
`;

interface IForm {
  username: string;
  password: string;
}

function Login() {
  const isLogin = useRecoilValue(isLogined);
  const [token, setToken, removeToken] = useCookies(["token", "refreshToken"]);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ username, password }: IForm) => {
    const body = {
      username,
      password,
    };
    axiosInstance
      .post("/api/v1/user/login", body)
      .then((response) => {
        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.accessToken;
        setToken("refreshToken", response.data.refreshToken);
        setToken("token", response.data.accessToken);
        if (response.status === 200) {
          window.location.replace("/");
        }
      })
      .catch((error) => setErrorMessage(error.response.data));
    setValue("password", "");
  };
  if (isLogin) {
    navigate("/");
  }
  return (
    <HomeContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <Title>Sign in to Ninfo</Title>
        <LabelWrapper>
          <Label htmlFor="username">Username</Label>
        </LabelWrapper>
        <Input
          {...register("username", { required: true })}
          placeholder="Username"
          id="username"
        ></Input>
        <LabelWrapper>
          <Label htmlFor="password">Password</Label>
        </LabelWrapper>
        <Input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          id="password"
        ></Input>
        <LabelWrapper>
          <Link to="/join">Or sign up now</Link>
        </LabelWrapper>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <LabelWrapper>
          <Button>Sign In</Button>
        </LabelWrapper>
      </Form>
    </HomeContainer>
  );
}

export default Login;
