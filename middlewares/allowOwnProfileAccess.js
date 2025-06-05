const allowOwnProfileAcess = (req, res, next) => {
  const requestedUserId = req.params.id;

  // Ensure the requesting user is accessing their own profile
  if (req.user._id.toString() !== requestedUserId.toString()) {
    return res
      .status(403)
      .json({ error: "Forbidden: You can only access your own profile" });
  }
  next()
};


module.exports = allowOwnProfileAcess;