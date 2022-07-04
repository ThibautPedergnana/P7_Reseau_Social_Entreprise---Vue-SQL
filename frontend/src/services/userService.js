import axios from "axios";
import getBaseUrl from "./config";

const getUser = async (userId) => {
  return axios
    .get(getBaseUrl() + "users/" + userId)
    .then((response) => response.data);
};

const updateAccount = async (body) => {
  return axios
    .put(getBaseUrl() + "users", body)
    .then((response) => response.data);
};

const updatePassword = async (body) => {
  return axios
    .patch(getBaseUrl() + "users/password", body)
    .then((response) => response.data);
};

const search = async (body) => {
  const search = body ? "?search=" + body : "";
  return axios
    .get(getBaseUrl() + "users" + search, body)
    .then((response) => response.data);
};

const deleteUser = async (body) => {
  return axios
    .delete(getBaseUrl() + "users", body)
    .then((response) => response.data);
};

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
