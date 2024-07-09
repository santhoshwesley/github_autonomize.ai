import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchUserData = (username) => api.get(`/users/${username}`);
export const fetchUserRepos = (username) => api.get(`/users/${username}/repos`);
export const fetchRepoDetails = (username, reponame) =>
  api.get(`/repos/${username}/${reponame}`);
export const fetchUserFollowers = (username) =>
  api.get(`/users/${username}/followers`);
