import axios from "axios";
import getBaseUrl from "./config";

// Récupération des commentaires
function getPostComments(postId) {
  return axios
    .get(getBaseUrl() + "posts/" + postId + "/comments")
    .then((response) => response.data);
}

// Création des commentaires
function createComment(body) {
  return axios
    .post(getBaseUrl() + "comments", body)
    .then((response) => response.data);
}

// Suppression des commentaires
function deleteComment(id) {
  return axios
    .delete(getBaseUrl() + "comments/" + id)
    .then((response) => response.data);
}

export { getPostComments, createComment, deleteComment };
