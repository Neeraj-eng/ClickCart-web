const express = require("express")
const router = express.Router()
const {signup,login} = require("../controllers/authn")
const {imageupload} = require("../Midleware/imageuplod")
const {addProduct, serchProducts, getProducts, getProduct, deleteProduct, updateProduct} = require("../controllers/product_manage")
const {isAuthenticate} = require("../Midleware/authz")

router.post("/signup",signup)
router.post("/login",login)
router.post("/addProduct",isAuthenticate,imageupload,addProduct)
router.get("/products/search",serchProducts)
router.get("/products",getProducts)
router.get("/product/:id",getProduct)
router.delete("/product/:id",isAuthenticate,deleteProduct)
router.put("/product/:id",imageupload,updateProduct)

router.get("/great",(req,res) => {
    return res.status(200).json({
        message : "hellow neeraj"
    })
})

module.exports = router;