import React, { useContext, useEffect, useState } from "react";
import "../scss/Css/Dialog.css";
import { AppContext } from "../contexts/AppContext";
import { Button } from "antd";

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
      : setStyle({ width: `${0}px`, height: `${0}px` });
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
      <h1 style={{
        position: 'absolute',
        top: '10px',

      }}>Memory Game</h1>
      <Button
        style={{
          fontSize: "20px",
          height: "40px"
        }}
        onClick={() =>
          statusGame === "menu" ? shuffleCards() : handleResumeGame()
        }
      >
        {statusGame === "menu" ? "Play Game" : "Resume Game"}
      </Button>
      <Button
        onClick={() => {
          setStatusGame("setting");
        }}
      >
        Setting
      </Button>
    </div>
  );
};

const DialogSetting = (probs) => {
  const { setStatusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
      <h1 style={{
        position: 'absolute',
        top: '10px',

      }}> Setting </h1>
      <Button
        onClick={() => {
          setStatusGame("menu");
        }}
      >
        Back
      </Button>
    </div>
  );
};

const DialogGameOver = (probs) => {
  const { setStatusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
      <h1 style={{
        position: 'absolute',
        top: '10px',

      }}>Game Over</h1>
      <Button
        onClick={() => {
          setStatusGame("menu");
        }}
      >
        New Game
      </Button>
      <Button
        onClick={() => {
          setStatusGame("menu");
        }}
      >
        Lưu kết quả
      </Button>
    </div>
  );
};

const DialogWin = (probs) => {
  const { setStatusGame } = useContext(AppContext);
  return (
    <div className="dialog-menu">
            <h1 style={{
        position: 'absolute',
        top: '10px',

      }}>Chiến thắng</h1>
      <div>
        <Button
          onClick={() => {
            setStatusGame("menu");
          }}
        >
          Màn kế tiếp
        </Button>
      </div>
    </div>
  );
};
