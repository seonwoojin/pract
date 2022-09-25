import { useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { AllNft, AllNftNonChain } from "../AllNft";
import { isLogined, subscirbeProject } from "../atom";
import { IInfo, IPost } from "../Routes/Home";
import styled from "styled-components";
import { DataContext } from "../context/DataProvider";
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
  opacity: ${(props) => (props.isNew ? null : "0.7")};
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
  nftData: IInfo;
  newPost: IPost[];
  userFavorite: string[];
}

interface IData {
  _id: string;
  chain: string;
  nft: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  likes: [string];
  unlikes: [string];
  SNS: string;
}

interface IPostData {
  post: string;
  user: string;
}

function NewProject({ nftData, newPost, userFavorite }: IProps) {
  const AllNftNonChains = AllNftNonChain;
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const { user } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [token] = useCookies(["token"]);
  const [project, setProject] = useState<string[]>(userFavorite);
  const [userPost, setUserPost] = useState<string[]>([]);
  const [newPostProject, setNewPostProject] = useState<string[]>([]);
  const [final, setFinal] = useState<string[]>([]);
  const [unReadPost, setUnReadPost] = useState<IPost[]>([]);
  const [readPost, setReadPost] = useState<IPost[]>([]);
  useEffect(() => {
    newPost.map((post) => setNewPostProject((prev) => [...prev, post.nft]));
    setUnReadPost(newPost);
    setIsLoading(false);
    setProject(userFavorite);
  }, [newPost, userFavorite]);

  useEffect(() => {
    setFinal([]);
    setProject(project.filter((pro) => !newPostProject.includes(pro)));
  }, [newPostProject]);

  useEffect(() => {
    if (final.length > project.length) {
      setFinal(
        final.filter((item, index, self) => self.indexOf(item) === index)
      );
    }
  }, [final]);

  useEffect(() => {
    if (isLogin) {
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
    if (userPost.length > 0) {
      setUnReadPost([]);
      newPost.map((post) => {
        if (userPost.includes(post._id)) {
          setReadPost((prev) => [...prev, post]);
        } else {
          setUnReadPost((prev) => [...prev, post]);
        }
      });
    }
  }, [userPost]);
  return (
    <Wrapper>
      {isLoading
        ? null
        : unReadPost.map((post, index) => (
            <Link
              key={post.title + index}
              to={`/${post.chain}/${post.nft}/${post._id}`}
            >
              <LogoBox isNew={true} logourl={AllNftNonChains[post.nft].logourl}>
                <RedPoint />
              </LogoBox>
            </Link>
          ))}
      {isLoading
        ? null
        : readPost.map((post, index) => (
            <Link
              key={post.title + index}
              to={`/${post.chain}/${post.nft}/${post._id}`}
            >
              <LogoBox
                isNew={true}
                logourl={AllNftNonChains[post.nft].logourl}
              ></LogoBox>
            </Link>
          ))}
      {isLoading
        ? null
        : project.map((info, index) => (
            <Link key={info + index} to={`${123}`}>
              <LogoBox
                isNew={false}
                logourl={AllNftNonChains[info].logourl}
              ></LogoBox>
            </Link>
          ))}
    </Wrapper>
  );
}

export default NewProject;
