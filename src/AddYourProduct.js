import Header from "./Header.js";
import "./App.css";
import "./Header.css";
import supabase from "./supabaseClient.js";
import { useState, useEffect } from "react";

function AddYourProduct() {
  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setInputValue(numericValue);
    if (!numericValue) {
      console.log("number only!");
    }
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    setPrice(numericValue);
    setInputValue(numericValue);
  };

  // fetching data
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

  // adding new data
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    if (!title || !description || !status || !price || !url) {
      console.log("All fields are required");
      return;
    }

    console.log("All fields");
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
      console.log("product added successfully", data);
      fetchProducts();
      setTitle("");
      setDescription("");
      setStatus("");
      setPrice("");
      setUrl("");
    }
  };

  // deleting data
  const deleteProduct = async (id) => {
    const { error } = await supabase.from("SupabaseEcom").delete().eq("id", id);
    if (error) console.log(error);
    setProduct(product.filter((products) => products.id !== id));
  };

  // Image URL
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.match("image.*")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    } else {
      setUrl("");
      setError("Please upload a valid picture file");
    }
  };

  // URL only code.
  const handleUrlChange = (event) => {
    const value = event.target.value;
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator

    if (urlPattern.test(value)) {
      setUrl(value);
      setError("");
    } else {
      setUrl("");
      setError("Please enter a valid url");
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
              <br />
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
                keyboardtype="numeric"
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
