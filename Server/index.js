const express = require("express")
const {connect} = require("./config/mongoconnect")
const router = require("./routes/Router")
const cookieparser = require("cookie-parser")
const {cloudinaryconnect} = require("./config/cloudnaryconnect")
const fileupload = require("express-fileupload")
const cors = require("cors")
const app = express()

require("dotenv").config()
connect();
cloudinaryconnect();


app.use(express.urlencoded({extended : true}));
app.use(express.json())
app.use(cookieparser())
app.use(fileupload({
  useTempFiles : true,
  tempFileDir: "./tmp/"
}))

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.get("/",(req,res)=>{
    res.send("hello from server")
})

app.use("/api",router)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});