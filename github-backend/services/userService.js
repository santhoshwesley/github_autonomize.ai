const axios = require("axios");
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_db_user",
  host: "localhost",
  database: "your_db_name",
  password: "your_db_password",
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

module.exports = {
  getRepositories,
};
