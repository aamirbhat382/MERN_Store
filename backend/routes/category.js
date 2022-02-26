const express = require("express");
const router = express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory} = require("../controllers/category");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById } = require("../controllers/user")

// params
router.param("userId",getUserById )
router.param("categoryId", getCategoryById)

// Actual Routes


// Create Routes
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin, createCategory)

// Update Routes
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,updateCategory)

// Read Routes
router.get("/category/:categoryId",getCategory)
router.get("/categorys",getAllCategory)


// Delete Routes

router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteCategory)

module.exports = router