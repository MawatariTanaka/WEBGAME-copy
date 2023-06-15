import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const Timer = (probs) => {
  const { statusGame, setStatusGame, setShowDialog } = useContext(AppContext);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timeCurrent = useRef(0);
  const timeInterval = useRef(null);

  // thoi gian hien tai
  const getTime = (timeCount) => {
    timeCurrent.current = timeCount - Date.now();
    console.log("getTime: ", timeCurrent.current , timeInterval.current);
    if (timeCurrent.current >= 0) {
      setMinutes(Math.floor((timeCurrent.current / 1000 / 60) % 60));
      setSeconds(Math.floor((timeCurrent.current / 1000) % 60));
    }else{
      clearInterval(timeInterval.current);
      setStatusGame('game_over');
      setShowDialog(true);
    }
  };

  useEffect(() => {
    let time = Date.now() + 5 * 1000 +50;
    if (statusGame === "play") {
      getTime(time);
      timeInterval.current = setInterval(() => getTime(time), 1000);
    }

    if (statusGame === "stop") {
      getTime(time);
    }

    if (statusGame === "resume") {
      time = Date.now() + timeCurrent.current;
      timeInterval.current = setInterval(() => getTime(time), 1000);
    }

    return () => {
      clearInterval(timeInterval.current);
    };
  }, [statusGame]);

  return (
    <div style={{
      visibility: statusGame !== 'menu' ? 'visible' : 'hidden'
    }}>
      Time: {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
};

export default Timer;
