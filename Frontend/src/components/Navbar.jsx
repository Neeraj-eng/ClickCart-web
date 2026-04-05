import React, { useContext, useEffect, useState } from "react";
import API from "../axios";
import { BiSun, BiMoon } from "react-icons/bi";
import { BsCartFill } from "react-icons/bs"; // Bootstrap-style cart from React Icons
import AppContext from "../Context/Context";


const Navbar = ({ onSelectCategory, onSearch }) => {
  const getInitialTheme = () => localStorage.getItem("theme") || "light-theme";

  const [selectedCategory, setSelectedCategory] = useState("");
  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const {cart} = useContext(AppContext)

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const fetchData = async () => {
    try {
      const response = await API.get("/products");
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await API.get(
          `/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:",error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  const categories = ["Laptop", "Headphone", "Mobile", "Electronics", "Toys", "Fashion"];

  return (
    <header>
       <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="https://codolio.com/profile/neeraj_nagar">
          ClickCart
          </a> 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/add_product">Add Product</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            
            <a className="nav-link px-2" href="/login">Login</a>
      
            <button className="btn btn-link me-3" onClick={toggleTheme}>
              {theme === "dark-theme" ? <BiSun size={22} /> : <BiMoon size={22} />}
            </button>

          
            <a href="/cart" className="nav-link me-3" style={{ position: "relative" }}>
            {(cart.length>=1) ? ( <div style={{
                  position: "absolute",
                  top: "-3px",
                  right: "-7px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "8px",
                  fontWeight: "bold",
               }}>{cart.length}</div>) : (<></>)}
               <BsCartFill size={22} />
            </a>

            <div className="d-flex align-items-center position-relative">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
              />
              {showSearchResults && (
                <ul className="list-group position-absolute top-100 start-0 w-100">
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <li key={result.id} className="list-group-item">
                        <a href={`/product/${result._id}`} className="search-result-link">
                          {result.name}
                        </a>
                      </li>
                    ))
                  ) : (
                    noResults && <p className="no-results-message m-2">No product found</p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
