import "./App.css";
import AddYourProduct from "./AddYourProduct.js";
import Home from "./Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddYourProduct" element={<AddYourProduct />} />
        <Route path="/LoginPage" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
