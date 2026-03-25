const Product = require("../Models/Product")

exports.addProduct = async (req, res) => {
    try {
        const { name, brand, description, price, category, quantity, date, image } = req.body;

        const product = await Product.create({
            name,
            brand,
            description,
            price,
            category,
            quantity,
            date,
            image: req.imageurl,
            createdBy: req.user._id
        });

        res.status(201).json(product);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};