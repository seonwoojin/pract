import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { isLogined } from "../atom";

interface IContext {
  isLogin: boolean;
  user: IUser;
}

export interface IUser {
  _id: string;
  username: string;
  name: string;
  password: string;
  admin: boolean;
  favoriteNft: [string];
  likes: [string];
}

export const DataContext = createContext<IContext>({} as IContext);

const DataProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const [token] = useCookies(["token"]);
  const [user, setUser] = useState({} as IUser);
  useEffect(() => {
    async function getUser() {
      if (token["token"] && token["token"] !== "undefined") {
        setIsLogin(true);
        const data = await axios
          .get(`http://localhost:4000/api/v1/user/data/`, {
            headers: {
              Authorization: `Bearer ${token["token"]}`,
            },
          })
          .then((response) => {
            setUser(response.data);
          });
      }
    }
    getUser();
  }, [token]);

  return (
    <DataContext.Provider value={{ isLogin, user }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
