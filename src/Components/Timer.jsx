import React, { useEffect, useState } from "react";

const Timer = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timeCount = Date.now() + 5*60*1000;

  // thoi gian hien tai
  const getTime = () => {
    const time = timeCount - Date.now();
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  // dem nguoc
  useEffect(() => {
    getTime(timeCount)
    const interval = setInterval(() => getTime(timeCount), 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>
    Time: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
  </div>;
};

export default Timer;
