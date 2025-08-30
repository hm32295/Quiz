import axios from "axios";
import https from "https";
import cookieServices from "./cookies/clientCookie";

export const axiosInstance = axios.create({
  // baseURL: "http://upskilling-egypt.com:3005"
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://upskilling-egypt.com:3005",
  headers: {
    "Content-Type": "application/json",
  },
  
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // client side
      const token = cookieServices.get("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
