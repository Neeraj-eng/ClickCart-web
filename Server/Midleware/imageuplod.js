const path = require("path");
const fs = require("fs")
const cloudinary = require("cloudinary").v2;

function issupported(imagetype,validtype){
    return validtype.includes(imagetype)
}

async function uploadcloudinary(file, folder, quality) {
    try {
        const options = {
            folder: folder,
            resource_type: "auto"
        };

        if (quality) {
            options.quality = quality;
        }

        const filePath = path.resolve(file.tempFilePath);

        console.log("Uploading file from:", filePath);

        const result = await cloudinary.uploader.upload(filePath, options);

        console.log("Upload success:", result);

        fs.unlinkSync(filePath);

        return result;

    } catch (error) {
        console.log("Cloudinary ERROR:", error);
    }
}

exports.imageupload = async (req,res,next) => {
    try{
         console.log("files",req.files);
        const file = req.files.image;
        console.log(file);
        const imagetype = file.name.split(".").pop().toLowerCase();

        const validtype = ["jpg","png","jpeg"]

        if(!issupported(imagetype,validtype)){
            return res.status(400).json({
                success : false,
                message : "this image type not supported"
            })
        }


        let response;
        try{
        response = await uploadcloudinary(file,"neeraj",70)
        }catch(err){
            console.log(err.message)
        }

        console.log(response);
        
        req.imageurl = response.secure_url
        next()
    }catch(err){
        console.log("image upload err")
        return res.status(400).json({
            message : `hii ${err.message}`
        })
    }
}