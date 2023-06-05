import React, { useContext, useEffect, useState } from "react";
import "../Css/Dialog.css";
import { AppContext } from "../Contexts/AppContext";
const Dialog = () => {
  const {showDialog, setShowDialog} = useContext(AppContext);
  const [style, setStyle] = useState("dialog");

  useEffect(() => {
    showDialog ? setStyle("dialog show") : setStyle('dialog');
  }, [showDialog]);

  return (
    <div
      className={style}
      onClick={() => {
        setShowDialog(false);
      }}
    >
      Dialog
    </div>
  );
};

export default Dialog;
