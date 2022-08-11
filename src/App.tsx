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
import MenuDetail from "./Components/MenuDetail";
import Info from "./Routes/Info";

function App() {
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
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/ethereum"
          element={
            <MenuDetail
              chain="Ethereum"
              chainNum={0}
              logoUrl="https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/cdbe4/eth-diamond-black.webp"
            />
          }
        />
        <Route
          path="/solana"
          element={
            <MenuDetail
              chain="Solana"
              chainNum={1}
              logoUrl="https://cryptologos.cc/logos/solana-sol-logo.png?v=023"
            />
          }
        />
        <Route
          path="/klaytn"
          element={
            <MenuDetail
              chain="Klaytn"
              chainNum={2}
              logoUrl="https://s2.coinmarketcap.com/static/img/coins/200x200/4256.png"
            />
          }
        />
        <Route path="/:chain/:nft" element={<Info />}></Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
