import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1000/api_calendar/",
  withCredentials: true,
  timeout: 1000,
});

export default axiosInstance;
