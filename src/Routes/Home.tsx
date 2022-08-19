import styled from "styled-components";
import { useScroll, useTransform, Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

const HomeContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: "Holtwood One SC";
`;

function Home() {
  return <HomeContainer></HomeContainer>;
}

export default Home;
