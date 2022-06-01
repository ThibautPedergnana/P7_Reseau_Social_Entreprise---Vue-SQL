import axios from "axios";
import getBaseUrl from "./config";

function getLikeStatus(postId) {
  return axios
    .get(getBaseUrl() + "posts/" + postId + "/liked")
    .then((response) => response.data);
}

function postLike(body) {
  return axios
    .post(getBaseUrl() + "likes", body)
    .then((response) => response.data);
}

export { getLikeStatus, postLike };
