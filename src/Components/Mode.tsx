import styled from "styled-components";
import { useRecoilState } from "recoil";
import { themeMode } from "./../atom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  z-index: 99;
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 30px;
`;
const ModeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 45px;
  border-radius: 20px;
  box-shadow: 1px 5px 5px 1px black;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 500;
  background-color: ${(props) => props.theme.lighter};
  transition: all 0.5s linear;
  margin-right: 20px;
  :hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.lighter};
    transform: translateY(-10px);
    svg {
      fill: ${(props) => props.theme.lighter};
    }
  }
  cursor: pointer;
  svg {
    margin-right: 10px;
    fill: ${(props) => props.theme.fontColor};
  }
`;

const UpBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 45px;
  border-radius: 10px;
  box-shadow: 1px 5px 5px 1px black;
  font-family: "Open Sans";
  font-size: 14px;
  font-weight: 500;
  background-color: ${(props) => props.theme.lighter};
  transition: all 0.5s linear;
  cursor: pointer;
  svg {
    fill: ${(props) => props.theme.fontColor};
    width: 15px;
    height: 20px;
  }
  :hover {
    transform: translateY(-10px);
  }
`;

function Mode() {
  const [mode, setMode] = useRecoilState(themeMode);
  const clickMode = () => {
    setMode((prev) => {
      localStorage.setItem("mode", String(!prev));
      return !prev;
    });
  };
  return (
    <Wrapper>
      <ModeBox onClick={clickMode}>
        {mode ? (
          <>
            <svg
              style={{ width: "15px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <svg
              style={{ width: "20px" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M256 73.1L150 0 126.7 126.7 0 150 73.1 256 0 362l126.7 23.3L150 512l106-73.1L362 512l23.3-126.7L512 362 438.9 256 512 150 385.3 126.7 362 0 256 73.1zM352 256c0-53-43-96-96-96s-96 43-96 96s43 96 96 96s96-43 96-96zm32 0c0 70.7-57.3 128-128 128s-128-57.3-128-128s57.3-128 128-128s128 57.3 128 128z" />{" "}
            </svg>
            <span>Light Mode</span>
          </>
        )}
      </ModeBox>
      <UpBox onClick={() => window.scrollTo(0, 0)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </UpBox>
    </Wrapper>
  );
}

export default Mode;
