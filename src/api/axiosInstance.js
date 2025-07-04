import axios from "axios";

const URL = "https://dummyjson.com/";

const axiosInstance = axios.create({
  baseURL: URL,
  timeout: 10000, // Set a timeout for requests (10 seconds)
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance };
