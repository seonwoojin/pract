import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Login from "./Routes/Login";
import Join from "./Routes/Join";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { isLogined, themeMode } from "./atom";
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
import Mode from "./Components/Mode";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { theme } from "./theme";
import Setting from "./Routes/Setting";

const GlobalStyle = createGlobalStyle`

${reset}

* {
  box-sizing: border-box;
}
body {
  font-family: 'Oswald','Holtwood One SC', 'Open Sans', sans-serif;
  font-weight: 400;
  color:${(props) => props.theme.fontColor};
  line-height: 1.2;
  background-color: ${(props) => props.theme.lighter};
  overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}
input[type="datetime-local"]::-webkit-inner-spin-button,
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
a {
  text-decoration: none;
  color:inherit;
}
`;

function App() {
  const nfts = Object.keys(AllNft);
  const [isLogin, setIsLogin] = useRecoilState(isLogined);
  const [cookies, setCookies, removeCokkies] = useCookies([
    "token",
    "refreshToken",
  ]);
  const [mode, setMode] = useRecoilState(themeMode);
  useEffect(() => {
    if (cookies.token && cookies.token !== "undefined") {
      setIsLogin(true);
    }
  }, [cookies]);

  return (
    <>
      <ThemeProvider theme={mode ? theme.white : theme.black}>
        <GlobalStyle />
        <Helmet>
          //@ts-ignore
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
              <Route path="/admin/" element={<Admin />} />
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
              <Route path="/setting" element={<Setting />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
            <Mode />
          </Router>
        </DataProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
