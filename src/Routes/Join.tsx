import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
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
  min-height: 40px;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-left: 10px;
  font-size: 15px;
`;

const Button = styled.button`
  border: none;
  width: 50%;
  min-width: 200px;
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 85%;
  color: red;
  font-weight: 600;
  margin-bottom: 10px;
`;

interface IForm {
  username: string;
  name: string;
  password: string;
  confirm_password: string;
}

function Join() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ username, name, password, confirm_password }: IForm) => {
    try {
      const body = {
        username,
        name,
        password,
        confirm_password,
      };
      axiosInstance
        .post("/api/v1/user/join", body)
        .then((response) => {
          if (response.status === 200) {
            navigate("/login");
          }
        })
        .catch((error) => setErrorMessage(error.response.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => console.log(errors), [errors]);
  return (
    <HomeContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <Title>Sign up to Ninfo</Title>
        <LabelWrapper>
          <Label htmlFor="username">Username</Label>
        </LabelWrapper>
        <Input
          {...register("username", {
            required: "Please enter your username.",
            minLength: {
              value: 4,
              message: "Username is too short (minimum is 4 characters).",
            },
          })}
          placeholder="Username"
          id="username"
        ></Input>
        <ErrorMessage>{errors.username?.message}</ErrorMessage>
        <LabelWrapper>
          <Label htmlFor="name">Name</Label>
        </LabelWrapper>
        <Input
          {...register("name", {
            required: "Please enter your name.",
            minLength: {
              value: 4,
              message: "Name is too short (minimum is 4 characters).",
            },
          })}
          placeholder="Name"
          id="name"
        ></Input>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <LabelWrapper>
          <Label htmlFor="password">Password</Label>
        </LabelWrapper>
        <Input
          {...register("password", {
            required: "Please enter your password.",
            minLength: {
              value: 8,
              message: "Password is too short (minimum is 8 characters).",
            },
          })}
          type="password"
          placeholder="Password"
          id="password"
        ></Input>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <LabelWrapper>
          <Label htmlFor="confirm_password">Confirm password</Label>
        </LabelWrapper>
        <Input
          {...register("confirm_password", {
            required: "Please enter your confirm password.",
          })}
          type="password"
          placeholder="confirm_password"
          id="confirm_password"
        ></Input>
        <ErrorMessage>{errors.confirm_password?.message}</ErrorMessage>
        <GoogleReCaptchaProvider reCaptchaKey="6LdNBdMhAAAAAO85D4eoAY_vkm6utUSpKbb_4bJ5">
          <GoogleReCaptcha
            onVerify={(event) => console.log()}
          ></GoogleReCaptcha>
        </GoogleReCaptchaProvider>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <LabelWrapper>
          <Button>Create account</Button>
        </LabelWrapper>
      </Form>
    </HomeContainer>
  );
}

export default Join;
