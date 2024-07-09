const axios = require("axios");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "github_data",
  password: "postgres",
  port: 5432,
});

const getRepositories = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    return response.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
    }));
  } catch (error) {
    throw new Error(
      `Error fetching repositories for ${username}: ${error.message}`
    );
  }
};

const saveUserData = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const user = response.data;

    const query = `
      INSERT INTO users (username, name, location, bio, blog, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (username) DO UPDATE
      SET name = EXCLUDED.name,
          location = EXCLUDED.location,
          bio = EXCLUDED.bio,
          blog = EXCLUDED.blog,
          avatar_url = EXCLUDED.avatar_url
      RETURNING *;
    `;
    const values = [
      user.login,
      user.name,
      user.location,
      user.bio,
      user.blog,
      user.avatar_url,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error saving user data: ${error.message}`);
  }
};

const getMutualFollowers = async (username) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/followers`
    );
    const followers = response.data.map((follower) => follower.login);

    const mutualFollowers = [];
    for (const follower of followers) {
      const followerResponse = await axios.get(
        `https://api.github.com/users/${follower}/followers`
      );
      const followerFollowers = followerResponse.data.map((f) => f.login);

      if (followerFollowers.includes(username)) {
        mutualFollowers.push(follower);
      }
    }

    return mutualFollowers;
  } catch (error) {
    throw new Error(`Error fetching mutual followers: ${error.message}`);
  }
};

const searchUserData = async (username, location) => {
  try {
    const query = `
      SELECT * FROM users
      WHERE username ILIKE $1 AND location ILIKE $2
    `;
    const values = [`%${username}%`, `%${location}%`];

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    throw new Error(`Error searching user data: ${error.message}`);
  }
};

const deleteUser = async (username) => {
  try {
    const query = `
      UPDATE users
      SET deleted_at = NOW()
      WHERE username = $1
      RETURNING *;
    `;
    const values = [username];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error soft deleting user: ${error.message}`);
  }
};

const updateUserData = async (username, data) => {
  try {
    const { location, blog, bio } = data;

    const query = `
      UPDATE users
      SET location = $1, blog = $2, bio = $3
      WHERE username = $4
      RETURNING *;
    `;
    const values = [location, blog, bio, username];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating user data: ${error.message}`);
  }
};

const listUserData = async (sortBy) => {
  try {
    const query = `
      SELECT * FROM users
      ORDER BY ${sortBy};
    `;

    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(`Error listing user data: ${error.message}`);
  }
};

module.exports = {
  getRepositories,
  saveUserData,
  getMutualFollowers,
  searchUserData,
  deleteUser,
  updateUserData,
  listUserData,
};
