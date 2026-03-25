const mongoose = require("mongoose")

const productshema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        enum : ["Slect category","Laptop","HeadPhone","Mobile","Electronics","Toys","Fasion"],
        required : true
    },
    quantity  : {
        type : Number,
        required : true,
        min : [1,"quantity must be at least 1"]
    },
    date : {
        type: String,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
},{
    timestamps: true   // 🔥 important
})

module.exports = mongoose.model("Product",productshema);