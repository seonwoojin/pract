import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { memo, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";
import { getAdminCheck, getUser } from "../axios";
import PageNotFound from "./PageNotFound";
import { AllNft } from "../AllNft";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "@looop/quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import { axiosInstance } from "../axiosInstance";
import { breakingPoint } from "../constants/breakingPoint";
import { DataContext } from "../context/DataProvider";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-height: 200vh;
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
  width: 40%;
  font-family: "Open Sans";
  padding: 100px;
  .editor {
    width: 800px;
    min-height: 500px;
  }
`;

const Title = styled.div`
  width: 1200px;
  height: 5vh;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  font-size: 30px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 65%;
  width: 30%;
  border-radius: 20px;
  //box-shadow: 5px 5px 10px -5px;
  background-color: transparent;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
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
  color: ${(props) => props.theme.fontColor};
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
  margin-bottom: 100px;
  background-color: #19191a;
  cursor: pointer;
  transition: all 0.3s linear;
  :hover {
    opacity: 0.5;
  }
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
  width: auto;
  font-size: 15px;
  font-weight: 500;
  background-color: ${(props) => props.theme.lighter};
  color: ${(props) => props.theme.fontColor};
  border: none;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  :hover {
    font-weight: 600;
  }
  option {
    width: auto;
  }
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
  input[type="datetime-local"]::-webkit-inner-spin-button,
  input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
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

const InfoHover = styled.div`
  z-index: 98;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
  width: 600px;
  height: 600px;
  margin-right: 20px;
  cursor: pointer;
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
  background-color: ${(props) => props.theme.lighter};
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
  .editor {
    width: 1200px;
    height: auto;
    min-height: 500px;
    padding-top: 20px;
    margin-bottom: 200px;
    word-break: keep-all;
    word-wrap: break-word;
    p {
      font-size: 16px;
    }
  }
`;

const NewsTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const NewsTitle = styled.textarea`
  width: 1200px;
  height: auto;
  word-break: keep-all;
  word-wrap: break-word;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  font-size: 40px;
  font-weight: 600;
  font-family: sans-serif;
  background-color: ${(props) => props.theme.lighter};
  color: ${(props) => props.theme.fontColor};
  border: none;
`;

const NewsTitleLogoWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 20px;
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
  font-size: 16px;
`;

const NewSnsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 1200px;
  height: 20px;
  opacity: 0.6;
  margin-top: 10px;
`;

const NewsDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: auto;
  min-height: 500px;
  padding-top: 20px;
  word-break: break-all;
  word-wrap: break-word;
  ul {
    list-style-type: disc;
  }
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
  _id?: string;
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
  const navigate = useNavigate();
  const today = new Date();
  const defaultToday = `${today.getFullYear()}-${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;
  const query = useLocation();
  const [token] = useCookies(["token"]);
  const [isEdit, setIsEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedChain, setSelectedChain] = useState("ETH");
  const { isLoading, data } = useQuery<IDate>(["check"], () =>
    getAdminCheck(token["token"])
  );
  const { isLoading: isUserLoading, data: userData } = useQuery(["user"], () =>
    getUser(token["token"])
  );
  const [address, setAddress] = useState([""]);
  const [addressCount, setAddressCount] = useState<number[]>([0]);
  const [chain, setChain] = useState("ETH");
  const [project, setProject] = useState("cryptopunks");
  const [sns, setSns] = useState("twitter");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(
    "https://images.pexels.com/photos/772803/pexels-photo-772803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  );
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState(defaultToday + " " + "00:00");
  const [createdDate, setCreatedDate] = useState(defaultToday + "T" + "00:00");
  const [descriptionValue, setDescriptionValue] = useState("");
  const { register, handleSubmit, setValue } = useForm<INftInfo>();
  // const checkOnlyOne = (element: HTMLInputElement) => {
  //   const checkBoxes = document.getElementsByName(
  //     "SNS"
  //   ) as NodeListOf<HTMLInputElement>;
  //   checkBoxes.forEach((cb) => {
  //     cb.checked = false;
  //   });
  //   element.checked = true;
  // };
  useEffect(() => {
    setDescription(descriptionValue);
  }, [descriptionValue]);
  useEffect(() => {
    async function editReset() {
      const body = { title };
      await axiosInstance.post(`/api/v1/admin/reset/edit`, body, {
        headers: {
          Authorization: `Bearer ${token["token"]}`,
        },
      });
    }
    if (isEdit && !isUserLoading) {
      editReset();
      const posCount: number[] = [];
      let pos = 0;
      while (pos !== -1) {
        pos = description.indexOf("img src", pos + 1);
        if (pos !== -1) posCount.push(pos);
      }
      for (let i = 0; i < posCount.length; i++) {
        if (i === posCount.length - 1) {
          setAddress((prev) => [
            ...prev,
            description
              .slice(posCount[i])
              .slice(9)
              .slice(
                0,
                description.slice(posCount[i]).slice(9).indexOf("></") - 1
              ),
          ]);
        } else {
          setAddress((prev) => [
            ...prev,
            description
              .slice(posCount[i], posCount[i + 1])
              .slice(9)
              .slice(
                0,
                description
                  .slice(posCount[i], posCount[i + 1])
                  .slice(9)
                  .indexOf("></") - 1
              ),
          ]);
        }
      }
    }
  }, [isEdit, isUserLoading]);
  useEffect(() => {
    async function reset() {
      await axiosInstance.get(`/api/v1/admin/reset`, {
        headers: {
          Authorization: `Bearer ${token["token"]}`,
        },
      });
    }
    reset();
  }, []);
  useEffect(() => {
    if (query.search.slice(4) !== "" && !isUserLoading) {
      axiosInstance
        .get(`/api/v1/nft/info/${query.search.slice(4)}`)
        .then((response) => {
          setCreatedDate(
            response.data.createdAt.slice(0, 10) +
              "T" +
              response.data.createdAt.slice(11)
          );
          setChain(response.data.chain);
          setSelectedChain(response.data.chain);
          setProject(response.data.nft);
          setSns(response.data.SNS);
          setTitle(response.data.title);
          setThumbnail(response.data.thumbnail);
          setDescription(response.data.description);
          setDescriptionValue(response.data.description);
          setCreatedAt(
            response.data.createdAt.slice(0, 10) +
              " " +
              response.data.createdAt.slice(11, 16)
          );
          // const checkBoxes = document.getElementsByName(
          //   "SNS"
          // ) as NodeListOf<HTMLInputElement>;
          // checkBoxes.forEach((cb) => {
          //   if (cb.value === response.data.SNS) {
          //     cb.checked = true;
          //   }
          // });
          setIsEdit(true);
        })
        .catch((error) => setErrorMessage(error.response.data));
    }
  }, [isUserLoading]);

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
          const result = await axiosInstance.post(
            `/api/v1/admin/img`,
            formData,
            {
              headers: {
                Username: userData?.data.username,
              },
            }
          );
          const IMG_URL: string = result.data;
          setAddress((prev) => [...prev, IMG_URL]);
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
  Quill.register("modules/ImageResize", ImageResize, true);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [...toolbarOptions],
        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, [isUserLoading]);
  useEffect(() => {
    address.forEach((add) => {
      const body = {
        add: add.replaceAll(
          `/post/${title.replaceAll(" ", "")}/`,
          `/temporary/${userData?.data.username}/`
        ),
      };
      if (!descriptionValue.includes(add)) {
        axiosInstance
          .post("/api/v1/admin/delete/img", body)
          .then((response) => {
            const prev: string[] = [];
            address.forEach((ad) => {
              if (ad !== add) {
                prev.push(ad);
              }
            });
            setAddress(() => [...prev]);
          });
      }
    });
  }, [descriptionValue]);

  if (token["token"] == undefined) {
    console.error("404 Page Not Found");
    return <PageNotFound />;
  }
  // if (!isLoading) {
  //   if (!data?.data) {
  //     console.error("404 Page Not Found");
  //   }
  // }
  const onValid = ({}) => {
    const editedDescription = description.replaceAll(
      `/temporary/${userData?.data.username}/`,
      `/post/${title.replaceAll(" ", "")}/`
    );
    const body = {
      chain,
      nft: project,
      title,
      thumbnail,
      description: editedDescription,
      SNS: sns,
      createdAt,
      _id: query.search?.slice(4),
    };
    if (isEdit) {
      axiosInstance
        .patch("/api/v1/admin/update", body, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            window.location.replace(
              `/${chain}/${project}/${query.search.slice(4)}`
            );
          }
        });
    } else {
      axiosInstance
        .post("/api/v1/admin/upload", body, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
          }
          setValue("title", "");
          setValue("thumbnail", "");
          navigate("/");
        })
        .catch((error) => setErrorMessage(error.response.data));
    }
  };

  //   return (
  //     <>
  //       {isLoading ? null : data?.data ? (
  //         <Form onSubmit={handleSubmit(onValid)}>
  //           <Wrapper>
  //             <Title>Admin</Title>
  //             {/* <LabelWrapper>
  //                   <Label htmlFor="title">Title</Label>
  //                 </LabelWrapper>
  //                 <Input
  //                   {...register("title", { required: true })}
  //                   placeholder="Title"
  //                   id="title"
  //                   value={title}
  //                   onChange={(event) => {
  //                     setTitle(event.currentTarget.value);
  //                   }}
  //                 ></Input> */}
  //             {/* <LabelWrapper>
  //               <Label>CreatedAt</Label>
  //             </LabelWrapper>
  //             <TextArea
  //                   {...register("description", { required: true })}
  //                   placeholder="Description"
  //                   id="description"
  //                   onChange={(event) => {
  //                     setDescription(event.currentTarget.value);
  //                   }}
  //                 ></TextArea>
  //             <TimeWrapper>
  //                <Input
  //                 {...register("createdAt", { required: true })}
  //                 value={createdDate}
  //                 type="date"
  //                 style={{ marginTop: "10px" }}
  //                 onChange={(event) => setCreatedDate(event.currentTarget.value)}
  //               ></Input>
  //              <Input
  //                 {...register("createdTime", { required: true })}
  //                 value={createdTime}
  //                 type="time"
  //                 style={{ marginTop: "10px" }}
  //                 onChange={(event) => setCreatedTime(event.currentTarget.value)}
  //               ></Input>
  //             </TimeWrapper> */}
  //           </Wrapper>
  //           <div style={{ display: "flex" }}>
  //             <NewsContainer>
  //               <NewsTitleWrapper>
  //                 <NewsTitle
  //                   placeholder="Title"
  //                   id="title"
  //                   value={title}
  //                   onChange={(event) => {
  //                     setTitle(event.currentTarget.value);
  //                   }}
  //                 ></NewsTitle>
  //                 <NewsTitleLogoWrapper>
  //                   <NewsTitleLogo
  //                     url={AllNfts[chain.toLowerCase()][project]?.logourl}
  //                   ></NewsTitleLogo>
  //                   <NewsTitleProjcetName>
  //                     <Select
  //                       {...register("chain", { required: true })}
  //                       value={chain}
  //                       id="chain"
  //                       onChange={(event) => {
  //                         setChain(event.currentTarget.value);
  //                         setSelectedChain(event.currentTarget.value);
  //                         if (event.currentTarget.value === "ETH") {
  //                           setProject("cryptopunks");
  //                         } else if (event.currentTarget.value === "SOL") {
  //                           setProject("okaybears");
  //                         } else if (event.currentTarget.value === "KLAY") {
  //                           setProject("themetakongzklaytn");
  //                         }
  //                       }}
  //                     >
  //                       <option value="ETH">ETH</option>
  //                       <option value="SOL">SOL</option>
  //                       <option value="KLAY">KLAY</option>
  //                     </Select>
  //                     {"|"}
  //                     <Select
  //                       id="nft"
  //                       value={project}
  //                       {...register("nft", { required: true })}
  //                       onChange={(event) => {
  //                         setProject(event.currentTarget.value);
  //                       }}
  //                     >
  //                       {selectedChain === "ETH" ? (
  //                         <>
  //                           <option value="cryptopunks">CryptoPunks</option>
  //                           <option value="boredapeyachtclub">
  //                             Bored-Ape-Yacht-Club
  //                           </option>
  //                           <option value="otherdeedforotherside">
  //                             Otherdeed-for-Otherside
  //                           </option>
  //                           <option value="azuki">Azuki</option>
  //                           <option value="clonex">CLONE-X</option>
  //                         </>
  //                       ) : null}
  //                       {selectedChain === "SOL" ? (
  //                         <>
  //                           <option value="okaybears">Okay-Bears</option>
  //                           <option value="degods">DeGods</option>
  //                           <option value="trippinapetribe">
  //                             Trippin-Ape-Tribe
  //                           </option>
  //                           <option value="cetsoncreck">Cets-on-Creck</option>
  //                           <option value="primates">Primates</option>
  //                         </>
  //                       ) : null}
  //                       {selectedChain === "KLAY" ? (
  //                         <>
  //                           <option value="themetakongzklaytn">
  //                             THE-META-KONGZ-KLAYTN
  //                           </option>
  //                           <option value="metatoydragonz">
  //                             Meta-Toy-DragonZ
  //                           </option>
  //                           <option value="sunmiyaclubofficial">
  //                             Sunmmiya-Club-Official
  //                           </option>
  //                           <option value="sheepfarm">SheepFarm</option>
  //                         </>
  //                       ) : null}
  //                     </Select>
  //                   </NewsTitleProjcetName>
  //                   <NewsTitleCreatedAt>
  //                     <Input
  //                       {...register("createdAt", { required: true })}
  //                       value={createdDate}
  //                       type="datetime-local"
  //                       style={{
  //                         marginTop: "10px",
  //                         opacity: "0.6",
  //                         border: "none",
  //                         width: "auto",
  //                       }}
  //                       onChange={(event) => {
  //                         setCreatedDate(
  //                           event.currentTarget.value.slice(0, 10) +
  //                             "T" +
  //                             event.currentTarget.value.slice(11, 16)
  //                         );
  //                         setCreatedAt(
  //                           event.currentTarget.value.slice(0, 10) +
  //                             " " +
  //                             event.currentTarget.value.slice(11, 16)
  //                         );
  //                       }}
  //                     ></Input>
  //                   </NewsTitleCreatedAt>
  //                 </NewsTitleLogoWrapper>
  //                 <NewSnsContainer>
  //                   <Select
  //                     {...register("SNS", { required: true })}
  //                     value={sns}
  //                     id="sns"
  //                     onChange={(event) => {
  //                       setSns(event.currentTarget.value);
  //                     }}
  //                   >
  //                     <option value="Twitter">Twitter</option>
  //                     <option value="Discord">Discord</option>
  //                   </Select>
  //                 </NewSnsContainer>
  //               </NewsTitleWrapper>
  //               <hr style={{ width: "100%" }}></hr>
  //               <ReactQuill
  //                 ref={(element) => {
  //                   if (element !== null) {
  //                     quillRef.current = element;
  //                   }
  //                 }}
  //                 className="editor"
  //                 theme="snow"
  //                 value={descriptionValue}
  //                 onChange={setDescriptionValue}
  //                 formats={formats}
  //                 modules={modules}
  //               />
  //             </NewsContainer>
  //           </div>
  //           <Wrapper>
  //             <LabelWrapper>
  //               <Label htmlFor="thumbnail">Thumbnail</Label>
  //             </LabelWrapper>
  //             <Input
  //               {...register("thumbnail", { required: true })}
  //               placeholder="Img URL"
  //               id="thumbnail"
  //               value={thumbnail}
  //               onChange={(event) => {
  //                 setThumbnail(event.currentTarget.value);
  //               }}
  //             ></Input>
  //           </Wrapper>
  //           <div
  //             style={{
  //               width: "100%",
  //               display: "flex",
  //               height: "auto",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <LeftHome>
  //               <InfoContainer>
  //                 <InfoWrapper>
  //                   <Info>
  //                     <InfoNonHover>
  //                       <InfoImage url={thumbnail}></InfoImage>
  //                       <InfoMain>
  //                         <InfoMainLogo
  //                           logourl={
  //                             AllNfts[chain.toLowerCase()][project]?.logourl
  //                           }
  //                         ></InfoMainLogo>
  //                         <InfoMainText>
  //                           <InfoMainTitle>
  //                             <div>{title}</div>
  //                           </InfoMainTitle>
  //                           <InfoMainSubText>
  //                             <h1>
  //                               {AllNfts[chain.toLowerCase()][project].title}
  //                             </h1>
  //                             <h1>{createdAt}</h1>
  //                           </InfoMainSubText>
  //                         </InfoMainText>
  //                       </InfoMain>
  //                     </InfoNonHover>
  //                   </Info>
  //                   <Info>
  //                     <InfoNonHover>
  //                       <InfoNonImage url={thumbnail}>
  //                         <InfoImageContext>{title}</InfoImageContext>
  //                         <InfoImageHashTag>#eth #event</InfoImageHashTag>
  //                       </InfoNonImage>
  //                       <InfoMain>
  //                         <InfoMainLogo
  //                           logourl={
  //                             AllNfts[chain.toLowerCase()][project]?.logourl
  //                           }
  //                         ></InfoMainLogo>
  //                         <InfoMainText>
  //                           <InfoMainTitle>
  //                             <div>{title}</div>
  //                           </InfoMainTitle>
  //                           <InfoMainSubText>
  //                             <h1>
  //                               {AllNfts[chain.toLowerCase()][project].title}
  //                             </h1>
  //                             <h1>{createdAt}</h1>
  //                           </InfoMainSubText>
  //                         </InfoMainText>
  //                       </InfoMain>
  //                     </InfoNonHover>
  //                   </Info>
  //                 </InfoWrapper>
  //               </InfoContainer>
  //             </LeftHome>
  //             <InfoHover>
  //               <InfoImage url={thumbnail}>
  //                 <InfoImageContext>{title}</InfoImageContext>
  //                 <InfoImageHashTag>#eth #event</InfoImageHashTag>
  //               </InfoImage>
  //               <InfoMain>
  //                 <InfoMainLogo
  //                   logourl={AllNfts[chain.toLowerCase()][project].logourl}
  //                 ></InfoMainLogo>
  //                 <InfoMainText>
  //                   <InfoMainTitle>
  //                     <div>{title}</div>
  //                   </InfoMainTitle>
  //                   <InfoMainSubText>
  //                     <h1>{AllNfts[chain.toLowerCase()][project].title}</h1>
  //                     <h1>{createdAt}</h1>
  //                   </InfoMainSubText>
  //                 </InfoMainText>
  //               </InfoMain>
  //             </InfoHover>
  //           </div>
  //           <div
  //             style={{
  //               width: "50%",
  //               display: "flex",
  //               flexDirection: "column",
  //               justifyContent: "center",
  //               alignItems: "center",
  //             }}
  //           >
  //             <ErrorMessage>{errorMessage}</ErrorMessage>
  //             <div
  //               style={{
  //                 width: "100%",
  //                 display: "flex",
  //                 justifyContent: "center",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Button>{isEdit ? "Edit" : "Upload"}</Button>
  //             </div>
  //           </div>
  //         </Form>
  //       ) : (
  //         <PageNotFound />
  //       )}
  //     </>
  //   );
  // }

  return (
    <>
      {isLoading ? null : (
        <Form onSubmit={handleSubmit(onValid)}>
          <Wrapper>
            <Title>Admin</Title>
            {/* <LabelWrapper>
                  <Label htmlFor="title">Title</Label>
                </LabelWrapper>
                <Input
                  {...register("title", { required: true })}
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.currentTarget.value);
                  }}
                ></Input> */}
            {/* <LabelWrapper>
              <Label>CreatedAt</Label>
            </LabelWrapper>
            <TextArea
                  {...register("description", { required: true })}
                  placeholder="Description"
                  id="description"
                  onChange={(event) => {
                    setDescription(event.currentTarget.value);
                  }}
                ></TextArea> 
            <TimeWrapper>
               <Input
                {...register("createdAt", { required: true })}
                value={createdDate}
                type="date"
                style={{ marginTop: "10px" }}
                onChange={(event) => setCreatedDate(event.currentTarget.value)}
              ></Input>
             <Input
                {...register("createdTime", { required: true })}
                value={createdTime}
                type="time"
                style={{ marginTop: "10px" }}
                onChange={(event) => setCreatedTime(event.currentTarget.value)}
              ></Input> 
            </TimeWrapper> */}
          </Wrapper>
          <div style={{ display: "flex" }}>
            <NewsContainer>
              <NewsTitleWrapper>
                <NewsTitle
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.currentTarget.value);
                  }}
                ></NewsTitle>
                <NewsTitleLogoWrapper>
                  <NewsTitleLogo
                    url={AllNfts[chain.toLowerCase()][project]?.logourl}
                  ></NewsTitleLogo>
                  <NewsTitleProjcetName>
                    <Select
                      {...register("chain", { required: true })}
                      value={chain}
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
                      <option value="ETH">ETH</option>
                      <option value="SOL">SOL</option>
                      <option value="KLAY">KLAY</option>
                    </Select>
                    {"|"}
                    <Select
                      id="nft"
                      value={project}
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
                          <option value="sunmiyaclubofficial">
                            Sunmmiya-Club-Official
                          </option>
                          <option value="sheepfarm">SheepFarm</option>
                        </>
                      ) : null}
                    </Select>
                  </NewsTitleProjcetName>
                  <NewsTitleCreatedAt>
                    <Input
                      {...register("createdAt", { required: true })}
                      value={createdDate}
                      type="datetime-local"
                      style={{
                        marginTop: "10px",
                        opacity: "0.6",
                        border: "none",
                        width: "auto",
                      }}
                      onChange={(event) => {
                        setCreatedDate(
                          event.currentTarget.value.slice(0, 10) +
                            "T" +
                            event.currentTarget.value.slice(11, 16)
                        );
                        setCreatedAt(
                          event.currentTarget.value.slice(0, 10) +
                            " " +
                            event.currentTarget.value.slice(11, 16)
                        );
                      }}
                    ></Input>
                  </NewsTitleCreatedAt>
                </NewsTitleLogoWrapper>
                <NewSnsContainer>
                  <Select
                    {...register("SNS", { required: true })}
                    value={sns}
                    id="sns"
                    onChange={(event) => {
                      setSns(event.currentTarget.value);
                    }}
                  >
                    <option value="Twitter">Twitter</option>
                    <option value="Discord">Discord</option>
                  </Select>
                </NewSnsContainer>
              </NewsTitleWrapper>
              <hr style={{ width: "100%" }}></hr>
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
            </NewsContainer>
          </div>
          <Wrapper>
            <LabelWrapper>
              <Label htmlFor="thumbnail">Thumbnail</Label>
            </LabelWrapper>
            <Input
              {...register("thumbnail", { required: true })}
              placeholder="Img URL"
              id="thumbnail"
              value={thumbnail}
              onChange={(event) => {
                setThumbnail(event.currentTarget.value);
              }}
            ></Input>
          </Wrapper>
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
            <InfoHover>
              <InfoImage url={thumbnail}>
                <InfoImageContext>{title}</InfoImageContext>
                <InfoImageHashTag>#eth #event</InfoImageHashTag>
              </InfoImage>
              <InfoMain>
                <InfoMainLogo
                  logourl={AllNfts[chain.toLowerCase()][project].logourl}
                ></InfoMainLogo>
                <InfoMainText>
                  <InfoMainTitle>
                    <div>{title}</div>
                  </InfoMainTitle>
                  <InfoMainSubText>
                    <h1>{AllNfts[chain.toLowerCase()][project].title}</h1>
                    <h1>{createdAt}</h1>
                  </InfoMainSubText>
                </InfoMainText>
              </InfoMain>
            </InfoHover>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button>{isEdit ? "Edit" : "Upload"}</Button>
            </div>
          </div>
        </Form>
      )}
    </>
  );
}

export default Admin;
