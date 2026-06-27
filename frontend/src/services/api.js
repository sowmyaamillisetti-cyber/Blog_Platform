import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-platform-fkxj.onrender.com",
});

export default API;