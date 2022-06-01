import axios from "axios";
import getBaseUrl from "./config";
import Router from "../router";

const login = async (body) => {
  return axios
    .post(getBaseUrl() + "auth/login", body)
    .then((response) => response);
};

const signup = async (body) => {
  return axios.post(getBaseUrl() + "auth/register", body).then((resp) => resp);
};

const currentUser = async () => {
  return axios.get(getBaseUrl() + "auth/currentUser").then((resp) => resp);
};

function updateAxiosAuthorization() {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + getAuthToken();

    return config;
  });
}

function updateAxiosInterceptors() {
  axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
      logout();
    }
  });
}

function getAuthToken() {
  const token = localStorage.auth;

  return token ?? null;
}

function logout() {
  localStorage.removeItem("auth");
  Router.push("/");
}

export {
  login,
  signup,
  currentUser,
  updateAxiosAuthorization,
  updateAxiosInterceptors,
  getAuthToken,
  logout,
};
