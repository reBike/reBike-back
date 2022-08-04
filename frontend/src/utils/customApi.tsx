import axios from "axios";
import { API_BASE_URL } from "./constants";

const Api = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
  params: {},
});

export default Api;
