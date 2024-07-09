const express = require("express");
const router = express.Router();
const {
  saveUser,
  getUserRepositories,
  findMutualFollowers,
  searchUsers,
  softDeleteUser,
  updateUser,
  listUsers,
} = require("../controllers/userController");
const {
  validateUserRequest,
  validateUpdateRequest,
} = require("../middleware/validationMiddleware");

router.post("/", validateUserRequest, saveUser);
router.post("/:username/friends", findMutualFollowers);
router.get("/search", searchUsers);
router.delete("/:username", softDeleteUser);
router.put("/:username", validateUpdateRequest, updateUser);
router.get("/:username/repos", getUserRepositories);
router.get("/", listUsers);

module.exports = router;
