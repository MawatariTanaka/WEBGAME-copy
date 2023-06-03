import React, { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";
import { NavLink, Route, Routes } from "react-router-dom";
import "../Css/Header.css";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import About from "../Pages/About";

const Menus = [
  {
    title: "Home",
    url: "/",
    style: "",
    icon: "",
  },
  {
    title: "Login",
    url: "/Login",
    style: "",
    icon: "",
  },
  {
    title: "Register",
    url: "/Register",
    style: "",
    icon: "",
  },
  {
    title: "About",
    url: "/About",
    style: "",
    icon: "",
  },
];

const Header = () => {
  const { mode, setMode } = useContext(AppContext);

  return (
    <div className="nav-bar">
      <h1>Web Game</h1>
      <div className="nav">
        {Menus.map((e) => (
          <NavLink
          key={e.title}
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link-main"
            }
            to={e.url}
          >
            {e.title}
          </NavLink>
        ))}

        <button
          onClick={() => {
            setMode(!mode);
          }}
        >
          Switch Mode
        </button>
      </div>
    </div>
  );
};

export default Header;
