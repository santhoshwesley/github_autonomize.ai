const validateUserRequest = (req, res, next) => {
  const { username } = req.params;
  if (!username) {
    return next({ status: 400, message: "Username is required" });
  }
  next();
};

const validateUpdateRequest = (req, res, next) => {
  const { location, blog, bio } = req.body;
  if (!location && !blog && !bio) {
    return next({
      status: 400,
      message:
        "At least one field (location, blog, bio) is required for update",
    });
  }
  next();
};

module.exports = { validateUserRequest, validateUpdateRequest };
