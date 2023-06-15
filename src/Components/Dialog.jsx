import React, { useContext, useEffect, useState } from "react";
import "../scss/Css/Dialog.css";
import { AppContext } from "../contexts/AppContext";

const Dialog = (probs) => {
  const { showDialog, statusGame } = useContext(AppContext);
  const [style, setStyle] = useState({});

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  useEffect(() => {
    console.log("dialog", windowWidth, windowHeight);
    showDialog
      ? setStyle({
          left: `${0}px`,
          opacity: 1,
          top: `${0}px`,
          width: `${windowWidth}px`,
          height: `${windowHeight}px`,
        })
      : setStyle({ width: `${windowWidth}px`, height: `${windowHeight}px` });
  }, [showDialog]);

  return (
    <div className="dialog" style={style}>
      {statusGame === "menu" && <DialogMenu probs={probs} />}
      {statusGame === "pause" && <DialogMenu probs={probs} />}
      {statusGame === "setting" && <DialogSetting probs={probs} />}
      {statusGame === "game_over" && <DialogGameOver probs={probs} />}
      {statusGame === "win" && <DialogWin probs={probs} />}
    </div>
  );
};

export default Dialog;

const DialogMenu = (probs) => {
  const { shuffleCards, handleResumeGame } = probs.probs;
  const { setStatusGame, statusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
      <button
        style={{
          fontSize: "20px",
        }}
        onClick={() =>
          statusGame === "menu" ? shuffleCards() : handleResumeGame()
        }
      >
        {statusGame === "menu" ? "Play Game" : "Resume Game"}
      </button>
      <button
        onClick={() => {
          setStatusGame("setting");
        }}
      >
        Setting
      </button>
    </div>
  );
};

const DialogSetting = (probs) => {
  const { setStatusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
      Setting
      <button
        onClick={() => {
          setStatusGame("menu");
        }}
      >
        Back
      </button>
    </div>
  );
};

const DialogGameOver = (probs) => {
  const { setStatusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
      GameOver
      <div>
        <button
          onClick={() => {
            setStatusGame("menu");
          }}
        >
          New Game
        </button>
        <button
          onClick={() => {
            setStatusGame("menu");
          }}
        >
          Lưu kết quả
        </button>
      </div>
    </div>
  );
};

const DialogWin = (probs) => {
  const { setStatusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
      Chiến thắng
      <div>
        <button
          onClick={() => {
            setStatusGame("menu");
          }}
        >
          Màn kế tiếp
        </button>
      </div>
    </div>
  );
};
