const axios = require("axios");
const {
  getUserData,
  saveUserData,
  getMutualFollowers,
  searchUserData,
  deleteUser,
  updateUserData,
  listUserData,
} = require("../services/userService");

const getUserRepositories = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
};

const getRepoDetails = async (req, res) => {
  const { username, reponame } = req.params;
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${reponame}`
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
};
const saveUser = async (req, res, next) => {
  const { username } = req.body;

  try {
    const userData = await saveUserData(username);
    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

const getUserFollowers = async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching GitHub followers:", error.message);
    res.status(500).json({ error: "Failed to fetch followers" });
  }
};

const findMutualFollowers = async (req, res, next) => {
  const { username } = req.params;

  try {
    const mutualFollowers = await getMutualFollowers(username);
    res.status(200).json({ mutualFollowers });
  } catch (error) {
    next(error);
  }
};

const searchUsers = async (req, res, next) => {
  const { username, location } = req.query;

  try {
    const users = await searchUserData(username, location);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const softDeleteUser = async (req, res, next) => {
  const { username } = req.params;

  try {
    await deleteUser(username);
    res.status(200).json({ message: "User soft deleted" });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { username } = req.params;
  const { location, blog, bio } = req.body;

  try {
    const userData = await updateUserData(username, { location, blog, bio });
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

const listUsers = async (req, res, next) => {
  const { sortBy } = req.query;

  try {
    const users = await listUserData(sortBy);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserRepositories,
  getRepoDetails,
  saveUser,
  findMutualFollowers,
  searchUsers,
  softDeleteUser,
  updateUser,
  listUsers,
  getUserFollowers,
};
