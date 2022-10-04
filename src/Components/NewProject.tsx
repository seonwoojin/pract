import { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllNft, AllNftNonChain } from "../AllNft";
import {
  chainString,
  isLogined,
  projectString,
  recentPost,
  subscirbeProject,
} from "../atom";
import { IInfo, IPost } from "../Routes/Home";
import styled from "styled-components";
import { DataContext, IUser } from "../context/DataProvider";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserPost } from "../axios";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../axiosInstance";
import { response } from "./../constants/response";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoBox = styled.div<{ logourl: string; isNew: boolean }>`
  position: relative;
  width: 80px;
  height: 80px;
  margin-right: 10px;
  background: url(${(props) => props.logourl});
  background-position: center center;
  background-size: 80px 80px;
  background-color: ${(props) => props.theme.darker};
  border: ${(props) => (props.isNew ? "5px solid red" : null)};
  border-image: linear-gradient(to right, #eaeaa7, #ffcdf3aa, #c1b0e6) 1;
  opacity: ${(props) => (props.isNew ? null : "0.6")};
  cursor: pointer;
  transition: all 0.5s linear;
  :hover {
    border-image: linear-gradient(to left, #eaeaa7, #ffcdf3aa, #c1b0e6) 1;
  }
`;

const RedPoint = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  top: -10px;
  right: -10px;
  background-color: #da1212;
`;

interface IProps {
  NftData: IInfo;
}

interface IPostData {
  post: string;
  user: string;
}

function NewProject({ NftData }: IProps) {
  const AllNftNonChains = AllNftNonChain;
  const projects: string[] = [];
  const [token, setToken, removeToken] = useCookies(["token"]);
  const [newPost, setNewPost] = useState<IPost[]>([]);
  const [userPost, setUserPost] = useState<string[]>([]);
  const [nextNewPost, setNextNewPost] = useState<IPost[]>([]);
  const [readPost, setReadPost] = useState<IPost[]>([]);
  const [showReadPost, setShowReadPost] = useState<IPost[]>([]);
  const [user, setUser] = useState<IUser>();
  const [lastProject, setLastProject] = useState<string[]>([]);
  const [newPostProjectArray, setNewPostProjectArray] = useState<string[]>([]);
  const [nextProjectArray, setNextProjectArray] = useState<string[]>([]);
  const [currentProjectArray, setCurrentProjectArray] = useState<string[]>([]);
  const [userFavorite, setUserFavorite] = useState<string[]>([]);
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [chain, setChain] = useRecoilState(chainString);
  const [project, setProject] = useRecoilState(projectString);
  const recentPostDate = useRecoilValue(recentPost);
  const date = new Date();
  useEffect(() => {
    async function getUser() {
      if (token["token"] && token["token"] !== "undefined") {
        const data = await axiosInstance
          .get(`/api/v1/user/data/`, {
            headers: {
              Authorization: `Bearer ${token["token"]}`,
            },
          })
          .then((response) => {
            setIsLogin(true);
            setUser(response.data);
          })
          .catch((error) => {
            if (error.response.data.name === "TokenExpiredError") {
              setUser({} as IUser);
              setIsLogin(false);
              removeToken("token");
            }
          });
      }
    }
    getUser();
  }, []);
  useEffect(() => {
    if (token) {
      const data = axiosInstance
        .get(`/api/v1/user/post/`, {
          headers: {
            Authorization: `Bearer ${token["token"]}`,
          },
        })
        .then((response) =>
          Object.values(response.data as IPostData).map((post) =>
            setUserPost((prev) => [...prev, post.post])
          )
        );
    }
  }, []);
  useEffect(() => {
    setNewPost([]);
    setReadPost([]);
    setNewPost([]);
    setNewPostProjectArray([]);
    setNextProjectArray([]);
    if (isLogin && user) {
      // if (typeof user.favoriteNft === "undefined") {
      //   window.location.replace("/");
      // }
      if (typeof user.favoriteNft !== "undefined") {
        Object.values(NftData!.data)
          .filter((project) => user.favoriteNft.includes(project.nft))
          .map((info) => {
            if (
              new Date(info.createdAt).getTime() -
                new Date().setDate(date.getDate() - recentPostDate) >=
              0
            ) {
              if (userPost.includes(info._id)) {
                setReadPost((prev) => [...prev, info]);
                setNewPostProjectArray((prev) => [...prev, info.nft]);
              } else if (!projects.includes(info.nft)) {
                setNewPost((prev) => [...prev, info]);
                setNewPostProjectArray((prev) => [...prev, info.nft]);
                projects.push(info.nft);
              } else {
                setNextNewPost((prev) => [...prev, info]);
                setNextProjectArray((prev) => [...prev, info.nft]);
              }
            }
          });
        setCurrentProjectArray(projects);
        setUserFavorite(user.favoriteNft);
      } else {
        Object.values(NftData!.data).map((info) => {
          if (
            new Date(info.createdAt).getTime() -
              new Date().setDate(date.getDate() - recentPostDate) >=
            0
          ) {
            if (!projects.includes(info.nft)) {
              setNewPost((prev) => [...prev, info]);
              projects.push(info.nft);
            } else {
              setNextNewPost((prev) => [...prev, info]);
            }
          }
        });
      }
    } else {
      {
        Object.values(NftData!.data).map((info) => {
          if (
            new Date(info.createdAt).getTime() -
              new Date().setDate(date.getDate() - recentPostDate) >=
              0 &&
            !projects.includes(info.nft)
          ) {
            if (!projects.includes(info.nft)) {
              setNewPost((prev) => [...prev, info]);
              projects.push(info.nft);
            } else {
              setNextNewPost((prev) => [...prev, info]);
            }
          }
        });
      }
    }
  }, [user, userPost]);
  useEffect(() => {
    setLastProject([]);
    setLastProject(
      userFavorite.filter((project) => {
        return !newPostProjectArray.includes(project);
      })
    );
  }, [newPostProjectArray, userFavorite]);
  useEffect(() => {
    const arr: string[] = [];
    setShowReadPost(() =>
      readPost.filter((post) => {
        if (currentProjectArray.length > 0 && !arr.includes(post.nft)) {
          if (!currentProjectArray.includes(post.nft)) {
            arr.push(post.nft);
            return true;
          }
          return false;
        } else {
          if (!arr.includes(post.nft)) {
            arr.push(post.nft);
            return true;
          }
          return false;
        }
      })
    );
  }, [currentProjectArray, readPost]);
  return (
    <Wrapper>
      {newPost.map((post, index) => (
        <Link
          key={post.title + index}
          to={`/${post.chain.toLowerCase()}/${post.nft}/${
            post._id
          }?banner=true`}
        >
          <LogoBox isNew={true} logourl={AllNftNonChains[post.nft].logourl}>
            <RedPoint />
          </LogoBox>
        </Link>
      ))}
      {showReadPost.map((post, index) => (
        // <Link
        //   key={post.title + index}
        //   to={`/${post.chain.toLowerCase()}/${post.nft}/${
        //     post._id
        //   }?banner=true`}
        // >
        <LogoBox
          key={post.title + index}
          isNew={true}
          logourl={AllNftNonChains[post.nft].logourl}
          onClick={() => {
            if (project !== AllNftNonChains[post.nft].title) {
              setChain(AllNftNonChains[post.nft].chain);
              setProject(AllNftNonChains[post.nft].title);
            } else {
              setChain("");
              setProject("");
            }
          }}
        ></LogoBox>
        //</Link>
      ))}
      {isLogin
        ? lastProject.sort().map((info, index) => (
            // <Link
            //   key={info + index}
            //   to={`/${AllNftNonChain[info].chain.toLowerCase()}/${info}`}
            // >
            <LogoBox
              key={info + index}
              isNew={false}
              logourl={AllNftNonChains[info].logourl}
              onClick={() => {
                if (project !== AllNftNonChains[info].title) {
                  setChain(AllNftNonChains[info].chain);
                  setProject(AllNftNonChains[info].title);
                } else {
                  setChain("");
                  setProject("");
                }
              }}
            ></LogoBox>
            // </Link>
          ))
        : null}
    </Wrapper>
  );
}

export default NewProject;
