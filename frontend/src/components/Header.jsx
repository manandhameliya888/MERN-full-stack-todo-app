import React from "react";
import { useNavigate } from "react-router-dom";
import { eraseCookie } from "../lib/cookie";
import { isUserLoggedIn } from "../lib/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    eraseCookie("token");
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1 className="title">TODO App</h1>
        {isUserLoggedIn() ? (
          <ul className="navbar-nav">
            <li className="nav-link" onClick={handleLogout}>
              Logout
            </li>
          </ul>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
