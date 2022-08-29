import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { response } from "./../constnats/response";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAdminCheck } from "../axios";
import PageNotFound from "./PageNotFound";
import { AllNft } from "../AllNft";
import Editor from "../Components/Editor";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 200vh;
  width: 100vw;
  font-family: "Open Sans";
  padding-top: 100px;
`;

const LeftHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 50%;
  font-family: "Open Sans";
`;
const RightHome = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
  width: 50%;
  font-family: "Open Sans";
  padding: 100px;
  .editor {
    width: 800px;
    min-height: 500px;
  }
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
  margin-bottom: 30px;
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin-bottom: 50px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 20px;
`;

const Info = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 400px;
  width: 400px;
  height: 400px;
  margin-right: 20px;
  cursor: pointer;
`;

const InfoNonHover = styled.div`
  width: 100%;
  height: 100%;
`;

const InfoImage = styled.div<{ url: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  background-image: url(${(props) => props.url});
  background-blend-mode: multiply;
  background-position: center center;
  background-size: cover;
  font-family: sans-serif;
`;

const InfoNonImage = styled.div<{ url: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60%;
  background-image: url(${(props) => props.url});
  background-blend-mode: multiply;
  background-position: center center;
  background-size: cover;
  font-family: sans-serif;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
`;

const InfoImageContext = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
  padding: 20px;
  overflow: hidden;
  word-break: break-all;
  word-wrap: break-word;
`;

const InfoImageHashTag = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 10px;
  opacity: 0.9;
`;

const InfoMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40%;
  padding: 10px;
  background-color: white;
`;

const InfoMainLogo = styled.div<{ logourl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url(${(props) => props.logourl});
  background-position: center center;
  background-size: cover;
`;

const InfoMainText = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 100%;
`;

const InfoMainTitle = styled.div`
  padding: 10px;
  height: 45%;
  width: 100%;
  div {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: 600;
    font-size: 16px;
    word-break: break-all;
    word-wrap: break-word;
  }
`;

const InfoMainSubText = styled.div`
  padding-left: 10px;
  height: 55%;
  width: 100%;
  h1 {
    margin-bottom: 5px;
    opacity: 0.8;
  }
`;

const NewsContainer = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewsTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const NewsTitle = styled.div`
  width: 1200px;
  height: auto;
  word-break: break-all;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  font-size: 40px;
  font-weight: 600;
  font-family: sans-serif;
`;

const NewsTitleLogoWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 50px;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
`;

const NewsTitleLogo = styled.div<{ url: string }>`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: url(${(props) => props.url});
  background-position: center center;
  background-size: cover;
`;

const NewsTitleProjcetName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 600px;
  height: 50px;
  opacity: 0.6;
`;

const NewsTitleCreatedAt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 550px;
  height: 50px;
  opacity: 0.6;
`;

const NewsDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: auto;
  min-height: 500px;
  padding-top: 20px;
  p {
    display: flex;
  }
  .ql-align-center {
    justify-content: center;
  }
  .ql-align-right {
    justify-content: flex-end;
  }
`;

export interface INftInfo {
  chain: string;
  nft: string;
  title: string;
  thumbnail: string;
  SNS: string[];
  createdAt: Date;
  createdTime: string;
  description: string;
}

interface IDate {
  data: boolean;
}

const toolbarOptions = [
  [{ font: [] }],
  ["link", "image", "video"],
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
];

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];

function Admin() {
  const quillRef = useRef<ReactQuill>();
  const AllNfts = AllNft;
  const today = new Date();
  const defaultToday = `${today.getFullYear()}-${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;
  const params = useParams();
  const navigate = useNavigate();
  const [token] = useCookies(["token"]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedChain, setSelectedChain] = useState("ETH");
  const { isLoading, data } = useQuery<IDate>(["check"], () =>
    getAdminCheck(token["token"])
  );
  const [chain, setChain] = useState("ETH");
  const [project, setProject] = useState("cryptopunks");
  const [sns, setSns] = useState("twitter");
  const [title, setTitle] = useState("Title");
  const [thumbnail, setThumbnail] = useState(
    "https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [createdDate, setCreatedDate] = useState(defaultToday);
  const [createdTime, setCreatedTime] = useState(" 00:00");
  const [descriptionValue, setDescriptionValue] = useState("");
  const { register, handleSubmit, setValue } = useForm<INftInfo>();
  const onValid = ({
    chain,
    nft,
    title,
    thumbnail,
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
  useEffect(() => {
    setDescription(descriptionValue);
    console.log(descriptionValue);
  }, [descriptionValue]);
  useEffect(
    () => setCreatedAt(`${createdDate} ${createdTime}`),
    [createdDate, createdTime]
  );

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async (event) => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("img", file);
        try {
          const result = await axios.post(
            "http://localhost:4000/api/v1/admin/img",
            formData
          );
          const IMG_URL = result.data;
          const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index!, "image", IMG_URL);
          // const range = editor.getSelection();
          // editor.insertEmbed(range.index, "image", IMG_URL);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [...toolbarOptions],
        handlers: { image: imageHandler },
      },
    };
  }, []);
  if (token["token"] == undefined) {
    console.error("404 Page Not Found");
    return <PageNotFound />;
  }
  if (!isLoading) {
    if (!data?.data) {
      console.error("404 Page Not Found");
    }
  }

  return (
    <>
      {isLoading ? null : data?.data ? (
        <HomeContainer>
          <div
            style={{
              width: "100%",
              display: "flex",
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LeftHome>
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
                      onChange={(event) => {
                        setChain(event.currentTarget.value);
                        setSelectedChain(event.currentTarget.value);
                        if (event.currentTarget.value === "ETH") {
                          setProject("cryptopunks");
                        } else if (event.currentTarget.value === "SOL") {
                          setProject("okaybears");
                        } else if (event.currentTarget.value === "KLAY") {
                          setProject("themetakongzklaytn");
                        }
                      }}
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
                    <Select
                      id="nft"
                      {...register("nft", { required: true })}
                      onChange={(event) => {
                        setProject(event.currentTarget.value);
                      }}
                    >
                      {selectedChain === "ETH" ? (
                        <>
                          <option value="cryptopunks">CryptoPunks</option>
                          <option value="boredapeyachtclub">
                            Bored-Ape-Yacht-Club
                          </option>
                          <option value="otherdeedforotherside">
                            Otherdeed-for-Otherside
                          </option>
                          <option value="azuki">Azuki</option>
                          <option value="clonex">CLONE-X</option>
                        </>
                      ) : null}
                      {selectedChain === "SOL" ? (
                        <>
                          <option value="okaybears">Okay-Bears</option>
                          <option value="degods">DeGods</option>
                          <option value="trippinapetribe">
                            Trippin-Ape-Tribe
                          </option>
                          <option value="cetsoncreck">Cets-on-Creck</option>
                          <option value="primates">Primates</option>
                        </>
                      ) : null}
                      {selectedChain === "KLAY" ? (
                        <>
                          <option value="themetakongzklaytn">
                            THE-META-KONGZ-KLAYTN
                          </option>
                          <option value="metatoydragonz">
                            Meta-Toy-DragonZ
                          </option>
                          <option value="sunmmiyaclubofficial">
                            Sunmmiya-Club-Official
                          </option>
                          <option value="sheepfarm">SheepFarm</option>
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
                    onChange={(event) => {
                      setSns(event.currentTarget.value);
                    }}
                  ></Input>
                  <h1>Discord</h1>
                  <Input
                    {...register("SNS", { required: true })}
                    name="SNS"
                    type="checkbox"
                    value="discord"
                    onClick={(event) => checkOnlyOne(event.currentTarget)}
                    onChange={(event) => {
                      setSns(event.currentTarget.value);
                    }}
                  ></Input>
                </CheckBoxWrapper>
                <LabelWrapper>
                  <Label htmlFor="title">Title</Label>
                </LabelWrapper>
                <Input
                  {...register("title", { required: true })}
                  placeholder="Title"
                  id="title"
                  onChange={(event) => {
                    setTitle(event.currentTarget.value);
                  }}
                ></Input>
                <LabelWrapper>
                  <Label htmlFor="thumbnail">Img URL</Label>
                </LabelWrapper>
                <Input
                  {...register("thumbnail", { required: true })}
                  placeholder="Img URL"
                  id="thumbnail"
                  onChange={(event) => {
                    setThumbnail(event.currentTarget.value);
                  }}
                ></Input>
                <LabelWrapper>
                  <Label>CreatedAt</Label>
                </LabelWrapper>
                {/* <TextArea
                  {...register("description", { required: true })}
                  placeholder="Description"
                  id="description"
                  onChange={(event) => {
                    setDescription(event.currentTarget.value);
                  }}
                ></TextArea> */}
                <TimeWrapper>
                  <Input
                    {...register("createdAt", { required: true })}
                    defaultValue={defaultToday}
                    type="date"
                    style={{ marginTop: "10px" }}
                    onChange={(event) =>
                      setCreatedDate(event.currentTarget.value)
                    }
                  ></Input>
                  <Input
                    {...register("createdTime", { required: true })}
                    defaultValue="00:00"
                    type="time"
                    style={{ marginTop: "10px" }}
                    onChange={(event) =>
                      setCreatedTime(event.currentTarget.value)
                    }
                  ></Input>
                </TimeWrapper>
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <LabelWrapper>
                  <Button>Upload</Button>
                </LabelWrapper>
              </Form>
              <InfoContainer>
                <InfoWrapper>
                  <Info>
                    <InfoNonHover>
                      <InfoImage url={thumbnail}></InfoImage>
                      <InfoMain>
                        <InfoMainLogo
                          logourl={
                            AllNfts[chain.toLowerCase()][project]?.logourl
                          }
                        ></InfoMainLogo>
                        <InfoMainText>
                          <InfoMainTitle>
                            <div>{title}</div>
                          </InfoMainTitle>
                          <InfoMainSubText>
                            <h1>
                              {AllNfts[chain.toLowerCase()][project].title}
                            </h1>
                            <h1>{createdAt}</h1>
                          </InfoMainSubText>
                        </InfoMainText>
                      </InfoMain>
                    </InfoNonHover>
                  </Info>
                  <Info>
                    <InfoNonHover>
                      <InfoNonImage url={thumbnail}>
                        <InfoImageContext>{title}</InfoImageContext>
                        <InfoImageHashTag>#eth #event</InfoImageHashTag>
                      </InfoNonImage>
                      <InfoMain>
                        <InfoMainLogo
                          logourl={
                            AllNfts[chain.toLowerCase()][project]?.logourl
                          }
                        ></InfoMainLogo>
                        <InfoMainText>
                          <InfoMainTitle>
                            <div>{title}</div>
                          </InfoMainTitle>
                          <InfoMainSubText>
                            <h1>
                              {AllNfts[chain.toLowerCase()][project].title}
                            </h1>
                            <h1>{createdAt}</h1>
                          </InfoMainSubText>
                        </InfoMainText>
                      </InfoMain>
                    </InfoNonHover>
                  </Info>
                </InfoWrapper>
              </InfoContainer>
            </LeftHome>
            <RightHome>
              <Label>Description</Label>
              <ReactQuill
                ref={(element) => {
                  if (element !== null) {
                    quillRef.current = element;
                  }
                }}
                className="editor"
                theme="snow"
                value={descriptionValue}
                onChange={setDescriptionValue}
                formats={formats}
                modules={modules}
              />
            </RightHome>
          </div>
          <NewsContainer>
            <NewsTitleWrapper>
              <NewsTitle>{title}</NewsTitle>
              <NewsTitleLogoWrapper>
                <NewsTitleLogo
                  url={AllNfts[chain.toLowerCase()][project]?.logourl}
                ></NewsTitleLogo>
                <NewsTitleProjcetName>
                  {AllNfts[chain.toLowerCase()][project].title}
                </NewsTitleProjcetName>
                <NewsTitleCreatedAt>{createdAt}</NewsTitleCreatedAt>
              </NewsTitleLogoWrapper>
            </NewsTitleWrapper>
            <hr style={{ width: "100%" }}></hr>
            <NewsDescription
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </NewsContainer>
        </HomeContainer>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}

export default Admin;
