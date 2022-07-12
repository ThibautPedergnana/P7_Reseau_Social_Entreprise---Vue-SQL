import axios from "axios";
import getBaseUrl from "./config";

// Récupération des utilisateurs
const getUser = async (userId) => {
  return axios
    .get(getBaseUrl() + "users/" + userId)
    .then((response) => response.data);
};

// Modification des infos d'un utilisateur
const updateAccount = async (body) => {
  return axios
    .put(getBaseUrl() + "users", body)
    .then((response) => response.data);
};

// Modification du mot de passe
const updatePassword = async (body) => {
  return axios
    .patch(getBaseUrl() + "users/password", body)
    .then((response) => response.data);
};

// Recherche du nom d'un utilisateur
const search = async (body) => {
  const search = body ? "?search=" + body : "";
  return axios
    .get(getBaseUrl() + "users" + search, body)
    .then((response) => response.data);
};

// Suppression d'un utilisateur
const deleteUser = async (body) => {
  return axios
    .delete(getBaseUrl() + "users", body)
    .then((response) => response.data);
};

// Modification de l'image de l'utilisateur
const patchImage = async (body) => {
  return axios
    .patch(getBaseUrl() + "users/image", body)
    .then((response) => response.data);
};

export {
  getUser,
  updateAccount,
  updatePassword,
  search,
  deleteUser,
  patchImage,
};
