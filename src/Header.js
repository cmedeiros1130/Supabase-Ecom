import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Header() {
  const navigate = useNavigate();
  const navigateTo = () => navigate("/AddYourProduct");

  return (
    <>
      <div className="ecomHeader">
        <Link to="/">
          <h1 className="headerH1">
            <span className="S">S</span>upabase<span className="S">E</span>
            commerce
          </h1>
        </Link>
        <div className="headerBtn">
          <button className="addProduct" onClick={navigateTo} type="button">
            Add product
          </button>
          <Link to="/LoginPage">
            <button className="login">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
