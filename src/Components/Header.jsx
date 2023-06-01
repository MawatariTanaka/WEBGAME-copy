import React, { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

const Header = () => {
  const { mode, setMode } = useContext(AppContext);

  return (
    <div>
      {" "}
      <button
        onClick={() => {
          setMode(!mode);
        }}
      >
        Switch Mode
      </button>
    </div>
  );
};

export default Header;
