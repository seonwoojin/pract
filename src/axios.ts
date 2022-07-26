import { axiosInstance } from "./axiosInstance";
import { response } from "./constants/response";

export interface IData {
  [key: string]: {
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
    hashTags: [string];
    text: string;
  };
}

export function getAdminCheck(token: string) {
  const data = axiosInstance.get(`/api/v1/admin/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function getNftInfo(nft: string) {
  const data = axiosInstance.get<IData>(`/api/v1/nft/?nft=${nft}`);

  return data;
}

export function getAllNft() {
  const data = axiosInstance.get("/api/v1/nft/all");

  return data;
}

export function getUser(token: string) {
  const data = axiosInstance.get(`/api/v1/user/data/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export function getSearch(keyword: string) {
  const data = axiosInstance.get(`/api/v1/nft/search/?keyword=${keyword}`);

  return data;
}

export function getInfoDetail(id: string) {
  const data = axiosInstance.get(`/api/v1/nft/info/${id}`).catch((error) => {
    throw new Error(error);
  });

  return data;
}

export function getUserPost(token: string) {
  const data = axiosInstance.get(`/api/v1/user/post/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
