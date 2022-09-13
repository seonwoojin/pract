import styled from "styled-components";
import { breakingPoint } from "../constants/breakingPoint";

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  background-color: #00000025;
  z-index: 99;
`;

const Title = styled.div`
  color: white;
  h1 {
    font-size: 30px;
    font-weight: 600;
    letter-spacing: 1px;
  }
  @media screen and (max-width: ${breakingPoint.deviceSizes.tablet}) {
    h1 {
      font-size: 20px;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <Title>
        <h1>BLUEROOM</h1> &copy; 2022 BLUEROOM. All rights reserved.
      </Title>
    </FooterWrapper>
  );
}

export default Footer;
