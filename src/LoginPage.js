import Header from "./Header.js";
import "./Header.css";
import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGreeting(`Welcome ${username} to Supabase Ecommerce`);
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-container">
          <div className="login-content">
            <h1 className="login-header">SupabaseEcommerce</h1>
            <h4 className="login-account">Create an account</h4>
            <input
              type="text"
              className="login-input"
              value={username}
              onChange={handleInputChange}
              placeholder="Username"
            />
            <button
              type="submit"
              className="login-submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
            {greeting && <p className="greeting-message">{greeting}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
