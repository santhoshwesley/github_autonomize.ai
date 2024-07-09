require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./Routes/UserRoutes"); 
const repoRoutes = require("./Routes/RepoRoutes");

const app = express();
const port = 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use("/repos", repoRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
