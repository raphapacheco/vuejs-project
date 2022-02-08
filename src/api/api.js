import axios from "axios";
import utilsStorage from "@/utils/storage";
import { URLS } from "@/constants/configurations";

const api = axios.create({
  baseURL: URLS.BASE,
});

api.interceptors.request.use(async (config) => {
  var token = await utilsStorage.obterTokenNaStorage();
  config.headers.Authorization = token;
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 401 && response.config.url !== "/login") {
      utilsStorage.removerAutenticacao();

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.config.url !== "/login"
    ) {
      utilsStorage.removerAutenticacao();

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default api;
