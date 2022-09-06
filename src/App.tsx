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
import Search from "./Routes/Search";
import SideBar from "./Components/SideBar";
import { Helmet } from "react-helmet-async";
import Footer from "./Components/Footer";

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
    <>
      <Helmet>
        <title>Blueroom</title>
        <link rel="canonical" href="https://www.tacobell.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blueroom" />
        <meta property="og:site_name" content="Blueroom" />
      </Helmet>
      <DataProvider>
        <Router>
          <Header />
          <SideBar />
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
            <Route path="/results/:search" element={<Search />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
