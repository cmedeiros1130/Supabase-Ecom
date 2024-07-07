import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import "./App.css";
import "./Header.css";
import supabase from "./supabaseClient.js";

function AddYourProduct() {
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  // Fetching data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("SupabaseEcom").select();
    if (error) {
      console.log(error);
    }
    setProduct(data || []);
    console.log("fetched products", data);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !status || !price || !url) {
      console.log("All fields are required");
      return;
    }

    const { data, error } = await supabase.from("SupabaseEcom").insert([
      {
        Title: title,
        Description: description,
        Status: status,
        Price: price,
        Url: url,
      },
    ]);
    if (error) {
      console.log("Error inserting product", error);
    } else {
      console.log("Product added successfully", data);
      fetchProducts();
      setTitle("");
      setDescription("");
      setStatus("");
      setPrice("");
      setUrl("");
    }
  };

  // Handle price input change
  const handlePriceChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setPrice(numericValue);
  };

  // Handle image file change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setUrl("");
      console.error("Please upload a valid picture file");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    const { error } = await supabase.from("SupabaseEcom").delete().eq("id", id);
    if (error) {
      console.error(error);
    } else {
      setProduct(product.filter((products) => products.id !== id));
    }
  };

  return (
    <>
      <Header />
      <div className="main-div-for-product">
        <h1 className="add-your-products">Add your Products</h1>
        <form className="productForm" onSubmit={handleSubmit}>
          <div className="input-groups">
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="inputName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-groups">
            <div className="input-group">
              <label htmlFor="textarea">Description</label>
              <textarea
                className="inputName"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="input-groups">
            <div className="input-group">
              <label htmlFor="title">Status: New/Used</label>
              <input
                type="text"
                className="inputName"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-groups">
            <div className="input-group">
              <label htmlFor="number">Price</label>
              <input
                type="text"
                className="inputName"
                value={price}
                onChange={handlePriceChange}
                placeholder="Enter Numbers only"
                required
              />
            </div>
          </div>

          <div className="input-groups">
            <div className="input-group">
              <input
                type="file"
                className="inputName"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          </div>
          <button className="form-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="whole-new-container">
        <div className="new-product-container">
          <ul className="new-product">
            {product.length > 0 ? (
              product.map((products) => (
                <li key={products.id}>
                  <div className="product-section">
                    {products.Url && (
                      <img
                        src={products.Url}
                        alt={products.Title}
                        className="product-image"
                      />
                    )}
                  </div>
                  <div className="product-section">
                    <h6>Name:</h6>
                    <span className="the-new-product">{products.Title}</span>
                  </div>
                  <div className="product-section">
                    <h6>Description:</h6>
                    <span className="the-new-product">
                      {products.Description}
                    </span>
                  </div>
                  <div className="product-section">
                    <h6>Status:</h6>
                    <span className="the-new-product">{products.Status}</span>
                  </div>
                  <div className="product-section">
                    <h6>Price:</h6>
                    <span className="the-new-product">{products.Price}</span>
                  </div>
                  <button
                    className="deletebtn"
                    onClick={() => deleteProduct(products.id)}
                  >
                    Delete
                  </button>
                </li>
              ))
            ) : (
              <p>No products available</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default AddYourProduct;
