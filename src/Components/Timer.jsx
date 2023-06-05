import React, { useEffect, useRef, useState } from "react";

const Timer = (probs) => {
  const { status, GameOver } = probs;
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
      GameOver(true);
    }
  };

  useEffect(() => {
    let time = Date.now() + 5 * 1000 +50;
    if (status.status === "play") {
      getTime(time);
      timeInterval.current = setInterval(() => getTime(time), 1000);
    }

    if (status.status === "stop") {
      getTime(time);
    }

    if (status.status === "resume") {
      time = Date.now() + timeCurrent.current;
      timeInterval.current = setInterval(() => getTime(time), 1000);
    }

    return () => {
      clearInterval(timeInterval.current);
    };
  }, [status]);

  return (
    <div>
      Time: {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
};

export default Timer;
