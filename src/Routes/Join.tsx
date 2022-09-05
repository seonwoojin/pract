import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import { axiosInstance } from "../axiosInstance";

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
  @media screen and (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
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
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-left: 10px;
  font-size: 15px;
`;

const Button = styled.button`
  border: none;
  width: 50%;
  height: 5vh;
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
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = ({ username, name, password, confirm_password }: IForm) => {
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
  };
  return (
    <HomeContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <Title>Sign up to Ninfo</Title>
        <LabelWrapper>
          <Label htmlFor="username">Username</Label>
        </LabelWrapper>
        <Input
          {...register("username", { required: true })}
          placeholder="Username"
          id="username"
        ></Input>
        <LabelWrapper>
          <Label htmlFor="name">Name</Label>
        </LabelWrapper>
        <Input
          {...register("name", { required: true })}
          placeholder="Name"
          id="name"
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
          <Label htmlFor="confirm_password">Confirm password</Label>
        </LabelWrapper>
        <Input
          {...register("confirm_password", { required: true })}
          type="password"
          placeholder="confirm_password"
          id="confirm_password"
        ></Input>
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
