const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById } = require("../controllers/user");
const {getProductById,createProduct,getProduct,photo,removeProduct,updateProduct,getAllProducts,getAllCategorys,getProducts } = require("../controllers/product");

router.param("userId",getUserById)
router.param("productId",getProductById)


// Create router
router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct);
// Read router
router.get("/product/:productId", getProduct)
router.get("/product/photo/:productId", photo)
// Delete router
router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, removeProduct)
// Update router
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct)
// Listing router
router.get("/products/", getAllProducts)
router.post('/products/cart-items', getProducts);
router.get("/products/categorys" , getAllCategorys)



module.exports = router