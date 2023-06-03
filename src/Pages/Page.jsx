import React, { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import About from "./About";
import Header from "../Components/Header";

const Page = () => {
  const { modeStyle } = useContext(AppContext);
  return (
    <div
      style={{
        ...modeStyle,
        minHeight: "100vh",
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
};

export default Page;
