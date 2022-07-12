import axios from "axios";
import getBaseUrl from "./config";
import Router from "../router";

// Gestion de connexion
const login = async (body) => {
  return axios
    .post(getBaseUrl() + "auth/login", body)
    .then((response) => response);
};

// Gestion d'inscription
const signup = async (body) => {
  return axios.post(getBaseUrl() + "auth/register", body).then((resp) => resp);
};

// Récupération des infos de l'utilisateur connecté
const currentUser = async () => {
  return axios.get(getBaseUrl() + "auth/currentUser").then((resp) => resp);
};

// Récupération du token de l'utilisateur connecté
function updateAxiosAuthorization() {
  axios.interceptors.request.use((config) => {
    config.headers.Authorization = "Bearer " + getAuthToken();

    return config;
  });
}

// Refresh du token
function updateAxiosInterceptors() {
  axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 401) {
      logout();
    }
  });
}

// Stockage du token de l'utilisateur connecté
function getAuthToken() {
  const token = localStorage.auth;

  return token ?? null;
}

// Suppression du token et redirection lors de la déconnexion
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
