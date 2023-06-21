import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { NavLink, Route, Routes } from "react-router-dom";
import "../scss/Css/Header.css";
import Clock from "./Clock";

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
      <h1>
        Web Game
      </h1>
      <Clock />
      <div className="nav">
        {Menus.map((e) => (
          <NavLink
            key={e.title}
            className='nav-link'
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
