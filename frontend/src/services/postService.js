import axios from "axios";
import getBaseUrl from "./config";

const getPosts = async () => {
  return axios.get(getBaseUrl() + "posts").then((response) => response.data);
};

const getOnePost = async (postId) => {
  return axios
    .get(getBaseUrl() + "posts/" + postId)
    .then((response) => response.data);
};

function createPost(body) {
  return axios
    .post(getBaseUrl() + "posts", body)
    .then((response) => response.data);
}

function deletePost(postId) {
  return axios
    .delete(getBaseUrl() + "posts/" + postId)
    .then((response) => response);
}

export { getPosts, getOnePost, deletePost, createPost };
