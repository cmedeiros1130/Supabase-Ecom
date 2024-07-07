import "./Header.css";
import "./App.css";
import { useState } from "react";

function MainHeading() {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGreeting(`Thank you ${username} for subscribing!`);
  };

  return (
    <>
      <div className="mainheading-page">
        <div className="main-heading">
          <div className="main-heading-text">
            <h1 className="main-heading-text-h1">
              Shop <span className="S">whenever</span>
              <br /> and <span className="S">however</span> you
              <br /> want from
              <br /> <span className="S">wherever</span> you are.
            </h1>
            <p className="main-heading-paragraph">
              SupabaseEcommerce improves and <br />
              streamlines your shopping experience..
            </p>
          </div>
          <img
            src="https://i.imgur.com/6jhmQER.png"
            className="main-heading-img"
            alt="ecom animation"
          />
        </div>
        <div className="features">
          <h1 className="features-heading">Features</h1>
          <p className="features-text">
            List of features that SupabaseEcommerce provides
          </p>
          <div className="featurebtns">
            <div className="feature-buttons1">
              <button className="feature-buttons">
                Register / Login feature(Coming Soon)
              </button>
            </div>
            <div className="feature-buttons2">
              <button className="feature-buttons">
                Add to cart(Coming Soon)
              </button>
            </div>
            <div className="feature-buttons3">
              <button className="feature-buttons">
                Personalized Shops(Coming Soon)
              </button>
            </div>
          </div>
          <div className="early-access">
            <h1 className="early-access-heading">Sign Up for Early access!</h1>
            <p className="early-access-text">
              SupabaseEcommerce improves and streamlines your shopping
              experience..!
            </p>
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <button className="submit" onClick={handleSubmit}>
              Submit
            </button>
            {greeting && <p className="greeting-message2">{greeting}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainHeading;
