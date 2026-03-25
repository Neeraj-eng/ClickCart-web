const express = require("express")
const router = express.Router()
const {signup,login} = require("../controllers/authn")

router.post("/signup",signup)
router.post("/login",login)

router.get("/great",(req,res) => {
    return res.status(200).json({
        message : "hellow neeraj"
    })
})

module.exports = router;