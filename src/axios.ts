import axios from "axios";

export function getAdminCheck(token: string) {
  const data = axios.get(`http://localhost:4000/api/v1/admin/check`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export function getNftInfo(nft: string) {
  const data = axios.get(`http://localhost:4000/api/v1/nft/?nft=${nft}`);

  return data;
}
