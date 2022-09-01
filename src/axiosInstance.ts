import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blueroom-info.herokuapp.com",
});
