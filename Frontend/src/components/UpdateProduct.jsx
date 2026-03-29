import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API from "../axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState(null)
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    date: "",
    productAvailable: false,
    quantity: "",
  });


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(
          `/product/${id}`
        );

        setProduct(response.data)
        setUpdateProduct({
          name: response.data.name || "",
          description: response.data.description || "",
          brand: response.data.brand || "",
          price: response.data.price || "",
          category: response.data.category || "",
          quantity: response.data.quantity || "",
          productAvailable: response.data.productAvailable || false,
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);





  const uploadImageToCloudinary = async () => {
    if (!image) return product.image; // keep old image

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
    formData.append("folder", "neeraj");
    
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ducsup5k1/image/upload",
      formData
    );

    return res.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Upload image (if changed)
      const imageUrl = await uploadImageToCloudinary();

      // Step 2: Prepare clean data
      const updatedData = {
        name: updateProduct.name,
        description: updateProduct.description,
        brand: updateProduct.brand,
        price: Number(updateProduct.price),
        category: updateProduct.category,
        quantity: Number(updateProduct.quantity),
        productAvailable: updateProduct.productAvailable,
        image: imageUrl,
      };

      // Step 3: Send JSON to backend
      const response = await API.put(`/product/${id}`, updatedData);

      console.log("Updated:", response.data);
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  return (
    <div className="update-product-container" >
      <div className="center-container" style={{ marginTop: "7rem" }}>
        <h1>Update Product</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.name}
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder={product.brand}
              value={updateProduct.brand}
              onChange={handleChange}
              id="brand"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.description}
              name="description"
              onChange={handleChange}
              value={updateProduct.description}
              id="description"
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.price}
              placeholder={product.price}
              name="price"
              id="price"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              placeholder={product.quantity}
              value={updateProduct.quantity}
              name="quantity"
              id="quantity"
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <img
              src={image ? URL.createObjectURL(image) : product.image}
              alt={product.imagename}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                padding: "5px",
                margin: "0",
              }}
            />
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              placeholder="Upload image"
              name="image"
              id="image"
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={updateProduct.productAvailable}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;