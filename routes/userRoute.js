const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authorize = require("../middlewares/authorize");
const allowOwnProfileUpdate = require("../middlewares/allowOwnProfileUpdate");
const allowOwnProfileAccess = require("../middlewares/allowOwnProfileAccess");

const router = express.Router();
router.get("/", auth, authorize("admin"), userController.getAllUsers);

router.get("/:id", auth, authorize("admin"), userController.getSingleUser);
router.get("/me/:id", auth,userController.getSingleUser);
router.delete(
  "/:id",
  auth,
  authorize("admin"),
  userController.deleteSingleUser
);

router.patch(
  "/:id",
  auth,
  allowOwnProfileUpdate,
  userController.updateUserProfile
);

module.exports = router;
