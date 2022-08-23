import axios from "axios";
import { response } from "./constnats/response";

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
  };
}

export function getAdminCheck(token: string) {
  const data = axios.get(`http://localhost:4000/api/v1/admin/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function getNftInfo(nft: string) {
  const data = axios.get<IData>(`http://localhost:4000/api/v1/nft/?nft=${nft}`);

  return data;
}

export function getAllNft() {
  const data = axios.get("http://localhost:4000/api/v1/nft/all");

  return data;
}

export function getUser(token: string) {
  const data = axios.get(`http://localhost:4000/api/v1/user/data/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
