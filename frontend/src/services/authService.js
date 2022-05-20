import axios from "axios";
import getBaseUrl from "./config";

const login = async (body) => {
  return axios
    .post(getBaseUrl() + "auth/login", body)
    .then((response) => response);
};

const signup = async (body) => {
  return axios.post(getBaseUrl() + "auth/register", body).then((resp) => resp);
};

export { login, signup };
