const express = require("express");
const router = express.Router();
const { getRepoDetails } = require("../controllers/userController");

router.get("/:username/repos/:reponame", getRepoDetails);

module.exports = router;
