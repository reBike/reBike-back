import axios from "axios";
import { API_BASE_URL } from "./constants";

console.log(API_BASE_URL);
const Api = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
  params: {},
});

export default Api;
