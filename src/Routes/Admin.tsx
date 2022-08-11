import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { response } from "./../constnats/response";

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
  height: 65%;
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
  height: 100%;
  width: 85%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-left: 10px;
  font-size: 15px;
  text-overflow: clip;
`;

const TextArea = styled.textarea`
  height: 100%;
  width: 85%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-left: 10px;
  font-size: 15px;
  text-overflow: clip;
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

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  margin-bottom: 20px;
  div {
    :last-child {
      display: flex;
      justify-content: center;
      width: 100%;
      align-items: center;
    }
  }
`;

const Select = styled.select`
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin-bottom: 20px;
  height: 2vh;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
`;

export interface INftInfo {
  chain: string;
  nft: string;
  title: string;
  thumbnail: string;
  description: string;
  SNS: string[];
  createdAt: Date;
  createdTime: string;
}

function Admin() {
  const params = useParams();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedChain, setSelectedChain] = useState("ETH");
  const { register, handleSubmit, setValue } = useForm<INftInfo>();

  const onValid = ({
    chain,
    nft,
    title,
    thumbnail,
    description,
    SNS,
    createdAt,
    createdTime,
  }: INftInfo) => {
    const body = {
      chain,
      nft,
      title,
      thumbnail,
      description,
      SNS: SNS[0],
      createdAt: createdAt + " " + createdTime,
    };
    axios
      .post("http://localhost:4000/api/v1/admin/upload", body)
      .then((response) => {
        if (response.status === 200) {
        }
        setValue("title", "");
        setValue("thumbnail", "");
        setValue("description", "");
      })
      .catch((error) => setErrorMessage(error.response.data));
  };
  const checkOnlyOne = (element: HTMLInputElement) => {
    const checkBoxes = document.getElementsByName(
      "SNS"
    ) as NodeListOf<HTMLInputElement>;
    checkBoxes.forEach((cb) => {
      cb.checked = false;
    });
    element.checked = true;
  };
  const today = new Date();
  const defaultToday = `${today.getFullYear()}-${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;
  useEffect(() => {
    if (params.nft === "31212") {
      navigate("/");
    }
  }, []);
  return (
    <HomeContainer>
      <Form onSubmit={handleSubmit(onValid)}>
        <Title>Admin</Title>
        <SelectWrapper>
          <LabelWrapper>
            <Label htmlFor="chain">Chain</Label>
          </LabelWrapper>
          <div>
            <Select
              {...register("chain", { required: true })}
              id="chain"
              onChange={(event) => setSelectedChain(event.currentTarget.value)}
            >
              <option value="ETH">Ethereum</option>
              <option value="SOL">Solana</option>
              <option value="KLAY">Klaytn</option>
            </Select>
          </div>
        </SelectWrapper>
        <SelectWrapper>
          <LabelWrapper>
            <Label htmlFor="nft">NFT</Label>
          </LabelWrapper>
          <div>
            <Select id="nft" {...register("nft", { required: true })}>
              {selectedChain === "ETH" ? (
                <>
                  <option value="CryptoPunks">CryptoPunks</option>
                  <option value="Bored-Ape-Yacht-Club">
                    Bored-Ape-Yacht-Club
                  </option>
                  <option value="Otherdeed-for-Otherside">
                    Otherdeed-for-Otherside
                  </option>
                  <option value="Azuki">Azuki</option>
                  <option value="CLONE-X">CLONE-X</option>
                </>
              ) : null}
              {selectedChain === "SOL" ? (
                <>
                  <option value="Okay-Bears">Okay-Bears</option>
                  <option value="DeGods">DeGods</option>
                  <option value="Trippin-Ape-Tribe">Trippin-Ape-Tribe</option>
                  <option value="Cets-on-Creck">Cets-on-Creck</option>
                  <option value="Primates">Primates</option>
                </>
              ) : null}
              {selectedChain === "KLAY" ? (
                <>
                  <option value="THE-META-KONGZ-KLAYTN">
                    THE-META-KONGZ-KLAYTN
                  </option>
                  <option value="Meta-Toy-DragonZ">Meta-Toy-DragonZ</option>
                  <option value="Sunmmiya-Club-Official">
                    Sunmmiya-Club-Official
                  </option>
                  <option value="SheepFarm">SheepFarm</option>
                </>
              ) : null}
            </Select>
          </div>
        </SelectWrapper>
        <CheckBoxWrapper>
          <div>Twitter</div>
          <Input
            {...register("SNS", { required: true })}
            type="checkbox"
            name="SNS"
            value="twitter"
            onClick={(event) => checkOnlyOne(event.currentTarget)}
          ></Input>
          <h1>Discord</h1>
          <Input
            {...register("SNS", { required: true })}
            name="SNS"
            type="checkbox"
            value="discord"
            onClick={(event) => checkOnlyOne(event.currentTarget)}
          ></Input>
        </CheckBoxWrapper>
        <LabelWrapper>
          <Label htmlFor="title">Title</Label>
        </LabelWrapper>
        <Input
          {...register("title", { required: true })}
          placeholder="Title"
          id="title"
        ></Input>
        <LabelWrapper>
          <Label htmlFor="thumbnail">Img URL</Label>
        </LabelWrapper>
        <Input
          {...register("thumbnail", { required: true })}
          placeholder="Img URL"
          id="thumbnail"
        ></Input>
        <LabelWrapper>
          <Label htmlFor="description">Description</Label>
        </LabelWrapper>
        <TextArea
          {...register("description", { required: true })}
          placeholder="Description"
          id="description"
        ></TextArea>
        <TimeWrapper>
          <Input
            {...register("createdAt", { required: true })}
            defaultValue={defaultToday}
            type="date"
            style={{ marginTop: "10px" }}
          ></Input>
          <Input
            {...register("createdTime", { required: true })}
            defaultValue="00:00"
            type="time"
            style={{ marginTop: "10px" }}
          ></Input>
        </TimeWrapper>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <LabelWrapper>
          <Button>Upload</Button>
        </LabelWrapper>
      </Form>
    </HomeContainer>
  );
}

export default Admin;
