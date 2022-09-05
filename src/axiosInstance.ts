import axios from "axios";
import { useCookies } from "react-cookie";

const production = "https://blueroom-info.herokuapp.com";
const development = "http://localhost:4000/";
const url = process.env.NODE_ENV ? production : development;

export const axiosInstance = axios.create({
  baseURL: url,
});
