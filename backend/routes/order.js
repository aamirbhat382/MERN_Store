const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById,pushOrderInPurchaseList } = require("../controllers/user");
const{updateStock} = require("../controllers/product")
const{getOrderById,createOrder,getAllOrders ,getOrderStatus,updateStatus} = require("../controllers/order")

router.param("userId",getUserById);
router.param("orderId", getOrderById);


// Create Routes

router.post("/order/create/:userId",isSignedIn, isAuthenticated, pushOrderInPurchaseList,updateStock , createOrder)

// Read Routes
router.get("/order/all/:userId",isSignedIn, isAuthenticated,isAdmin, getAllOrders)
// Status Routes

router.get("/order/status/:userId",isSignedIn, isAuthenticated,isAdmin,)
router.put("/order/:orderId/status/:userId",isSignedIn, isAuthenticated,isAdmin,)



module.exports = router