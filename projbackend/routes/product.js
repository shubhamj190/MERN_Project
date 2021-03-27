const express= require("express")
const router=express.Router()

const {getProductById,createProduct}= require("../controllers/product")
const { isAdmin, isAuthenticated, isSignedin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// all params
router.param("userid", getUserById)
router.param("productid", getProductById)

// all actual routes

router.post("/product/create/:userid", isSignedin, isAuthenticated, isAdmin, createProduct)


module.exports=router