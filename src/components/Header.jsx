import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { NavLink } from "react-router-dom";
import "../scss/Css/Header.css";
import { Button } from "antd";

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
      <div className="nav">
        <h1>
          Web Game
        </h1>
      </div>

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
      </div>
      <Button
        style={{ backgroundColor: 'yellow'}}
        onClick={() => {
          setMode(!mode);
        }}
      >
        Contact Us
      </Button>
    </div>
  );
};

export default Header;
