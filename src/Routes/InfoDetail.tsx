import styled from "styled-components";
import { useParams } from "react-router-dom";

const HomeWrapper = styled.div`
  padding-top: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100vw;
  font-family: "Open Sans";
  overflow-x: hidden;
`;

function InfoDetail() {
  const parmas = useParams();
  console.log(parmas.id);

  return <HomeWrapper>123</HomeWrapper>;
}

export default InfoDetail;
