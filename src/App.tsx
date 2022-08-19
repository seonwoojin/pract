import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Join from "./Routes/Join";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLogined } from "./atom";
import Admin from "./Routes/Admin";
import MenuDetail from "./Routes/MenuDetail";
import Info from "./Routes/Info";
import PageNotFound from "./Routes/PageNotFound";
import { AllNft } from "./AllNft";
import InfoDetail from "./Routes/InfoDetail";
import DataProvider from "./context/DataProvider";

function App() {
  const nfts = Object.keys(AllNft);
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [cookies, setCookies, removeCokkies] = useCookies([
    "token",
    "refreshToken",
  ]);

  useEffect(() => {
    if (cookies.token && cookies.token !== "undefined") {
      setIsLogin(true);
    }
  }, [cookies]);
  return (
    <DataProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/admin" element={<Admin />} />
          {nfts.map((nft, index) => (
            <Route
              key={"nft" + index}
              path={`/${nft}`}
              element={
                <MenuDetail
                  logoColor="linear-gradient(to right, rgb(140,140,140), rgb(20,20,20));"
                  chain={nft}
                />
              }
            />
          ))}
          <Route path="/:chain/:nft" element={<Info />}></Route>
          <Route path="/:chain/:nft/:id" element={<InfoDetail />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
