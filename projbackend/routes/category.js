const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userid", getUserById);
router.param("categoryid", getCategoryById);
// actual router goes here

router.post(
  "/category/create/:userid",
  isSignedin,
  isAuthenticated,
  isAdmin,
  createCategory
);
router.get("category/:categoryid", getCategory);
router.get("category/all", getAllCategory);

router.put(
  "/category/:categoryid/:userid",
  isSignedin,
  isAuthenticated,
  isAdmin,
  updateCategory
);

router.delete(
  "/category/:categoryid/:userid",
  isSignedin,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
