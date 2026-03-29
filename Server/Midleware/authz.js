const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.isAuthenticate = async (req,res,next) => {
    try{
         const token = req.body?.token || req.cookies?.token || req.header("Authorization")?.split(" ")[1];
        if(!token){
            console.log("token is missing")
            return res.status(400).json({
                message : "token missing"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next()
    } catch (err) {
        res.status(401).json({
            message: `hii ${err.message}`
        })
    }
}