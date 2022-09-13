import styled from "styled-components";
import { breakingPoint } from "../constants/breakingPoint";

const Home = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    font-size: 30px;
  }
`;

function PageNotFound() {
  return <Home>Sorry, this page is not found</Home>;
}

export default PageNotFound;
