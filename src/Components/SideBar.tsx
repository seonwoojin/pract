import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AllNft } from "../AllNft";
import { useRecoilState } from "recoil";
import { isFilterShow } from "../atom";

const Wrapper = styled.div`
  position: fixed;
  top: 60px;
  z-index: 99;
  display: flex;
  font-family: "Open Sans", sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  height: calc(100vh - 60px);
  min-height: 500px;
  background: linear-gradient(to top, white, #eeecec);
  padding: 20px;
  padding-top: 50px;
  svg {
    width: 25px;
    height: 25px;
    margin-bottom: 70px;
    opacity: 0.7;
    cursor: pointer;
  }
`;

const DetailContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh-60px);
  min-height: 500px;
  width: 240px;
  background: linear-gradient(to top, white, #fafafa);
`;

const DetailTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 80px;
  font-size: 25px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 80px;
  border-radius: 10px;
  background-color: white;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
`;

const FilterTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 40%;
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
`;

const FilterSelect = styled.select`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 90%;
  height: 50%;
  border: none;
  font-size: 15px;
  font-weight: 600;
  background: url("https://t1.daumcdn.net/cfile/tistory/99761B495C84AA8716")
    no-repeat 100% 50%;
  border-radius: 0px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function SideBar() {
  const allNfts = AllNft;
  const [show, setShow] = useRecoilState(isFilterShow);
  const [chain, setChain] = useState("");
  const [project, setProject] = useState("");
  const onChangeChain = (value: string) => {
    setChain(value);
  };
  const onChangeProject = (value: string) => {
    setProject(value);
  };
  return (
    <Wrapper>
      <Container>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" />
          </svg>
        </Link>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M96 32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32zM448 464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192H448V464z" />
        </svg>
        <svg
          onClick={() => setShow((prev) => !prev)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
        </svg>
      </Container>
      {show ? (
        <DetailContainer>
          <DetailTitle>Filter</DetailTitle>
          <FilterContainer>
            <FilterTitle>Chain</FilterTitle>
            <FilterSelect
              onChange={(event) => onChangeChain(event.currentTarget.value)}
              value={chain}
            >
              <option value="">All</option>
              <option value="eth">ETH</option>
              <option value="sol">SOL</option>
              <option value="klay">KLAY</option>
            </FilterSelect>
          </FilterContainer>
          <FilterContainer>
            <FilterTitle>Project</FilterTitle>
            <FilterSelect
              onChange={(event) => onChangeProject(event.currentTarget.value)}
              value={project}
            >
              <option value="">All</option>
              {chain === ""
                ? null
                : Object.values(allNfts[chain]).map((data) => (
                    <option key={data.title} value={data.title}>
                      {data.title}
                    </option>
                  ))}
            </FilterSelect>
          </FilterContainer>
        </DetailContainer>
      ) : null}
    </Wrapper>
  );
}

export default SideBar;
