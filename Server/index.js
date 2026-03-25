const express = require("express")
const {connect} = require("./config/mongoconnect")
const router = require("./routes/Router")
const cookieparser = require("cookie-parser")
const app = express()

app.use(express.urlencoded({extended : true}));
require("dotenv").config()
app.use(express.json())
app.use(cookieparser())
connect();

app.get("/",(req,res)=>{
    res.send("hello from server")
})

app.use("/",router)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});