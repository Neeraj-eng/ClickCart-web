const mongoose = require("mongoose")
require("dotenv").config()
exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("database connected"))
    .catch((err)=>{
        console.log("can not connected");
        console.log(err);
        process.exit(1);
    })
}