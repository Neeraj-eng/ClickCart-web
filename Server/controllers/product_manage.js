const Product = require("../Models/Product");

exports.addProduct = async (req, res) => {
    try {
        const { name, brand, description, price, category, quantity, date} = req.body;
        console.log(name,"-",brand,"-",description,"-", price,"-", category, "-",quantity, "-",date,)
        const product = await Product.create({
            name,
            brand,
            description,
            price,
            category,
            quantity,
            date,
            image: req.imageurl,
            // createdBy: req.user.id
        });
      res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products); 

  } catch (err) {
    res.status(500).json({
      message: `Error fetching products: ${err.message}`
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id);

    res.status(200).json(product); 

  } catch (err) {
    res.status(500).json({
      message: `Error fetching product: ${err.message}`
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id); 

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      message: `Error deleting product: ${err.message}`
    });
  }
};

exports.updateProduct = async (req, res) => {

   const updateData = { ...req.body };

    if (req.imageurl) {
      updateData.image = req.imageurl;
    }

    console.log(updateData.image)
    console.log(req.imageurl)

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

exports.serchProducts = async(req,res) => {
    const keyword = req.query.keyword;
    if(!keyword){
      return res.status(400).json({message : "enter a keyword please"})
    }

    try{
      const products = await Product.find({
        $or : [
          {name : {$regex : keyword ,$options : "i"}},
          {category : {$regex : keyword ,$options : "i"}},
          {price : {$regex : keyword ,$options : "i"}}
        ]
      })
      
      res.status(200).json(products)
    }catch(err){
      console.log("serchproduct",err.massage)
      return res.status(500).json({"message" : err.message})
    }
}