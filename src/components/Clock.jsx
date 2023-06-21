import React, { useEffect, useState } from "react";

const formatDate = (date) => {
  if (!date) return "";

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const Clock = () => {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const now = new Date();
      const timeString = formatDate(now);
      setTimeString(timeString);
    }, 1000);

    return () => {
        clearInterval(timeInterval);
    };
  }, []);
  return <div>Clock: {timeString}</div>;
};

export default Clock;
