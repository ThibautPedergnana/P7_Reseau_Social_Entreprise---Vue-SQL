import axios from "axios";
import getBaseUrl from "./config";

// Récupération des posts
const getPosts = async () => {
  return axios.get(getBaseUrl() + "posts").then((response) => response.data);
};

// Récupération d'un post
const getOnePost = async (postId) => {
  return axios
    .get(getBaseUrl() + "posts/" + postId)
    .then((response) => response.data);
};

// Création d'un post
function createPost(body) {
  return axios
    .post(getBaseUrl() + "posts", body)
    .then((response) => response.data);
}

// Suppression d'un post
function deletePost(postId) {
  return axios
    .delete(getBaseUrl() + "posts/" + postId)
    .then((response) => response);
}

// Récupération des posts d'un utilisateur
const getUserPosts = async (userId) => {
  return axios
    .get(getBaseUrl() + "users/" + userId + "/posts")
    .then((response) => response.data);
};

export { getPosts, getOnePost, deletePost, createPost, getUserPosts };
