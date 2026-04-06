const express = require("express")
const router = express.Router()
const {signup,login, logout} = require("../controllers/authn")
const {imageupload} = require("../Midleware/imageuplod")
const {addProduct, serchProducts, getProducts, getProduct, deleteProduct, updateProduct} = require("../controllers/product_manage")
const {isAuthenticate} = require("../Midleware/authz")

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/addProduct",isAuthenticate,imageupload,addProduct)
router.get("/products/search",serchProducts)
router.get("/products",getProducts)
router.get("/product/:id",getProduct)
router.delete("/product/:id",isAuthenticate,deleteProduct)
router.put("/product/:id",isAuthenticate,imageupload,updateProduct)

router.get("/isAuth",isAuthenticate,(req,res) => {
    res.status(200).json({
        isAuth : true,
        message:"user is authenticated"
    })
})


module.exports = router;