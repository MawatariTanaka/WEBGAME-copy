import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Contexts/AppContext";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
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
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />}>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />
        </Route>
      </Routes>
      <AnimateDog />
    </div>
  );
};

export default Page;

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Not Found");
    setTimeout(() => {
      navigate('/');
    },3000);
  },[]);
  return(
    <div>
      Not Found
    </div>
  );
};

const AnimateDog = () => {
  const [canvas, setCanvas] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [frame, setFrame] = useState(0);
  const [gameFrame, setGameFrame] = useState(0);

  const staggerFrames = 6;
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;
  const dogImage = new Image();
  dogImage.src = "/imgs/shadow_dog.png";
  const spriteWidth = 575;
  const spriteHeight = 523;

  useEffect(() => {
    // if (gameFrame % staggerFrames === 0) {
    //   if (frame < 6) setFrame(frame + 1);
    //   else setFrame(1);
    // }
  }, [gameFrame]);

  useEffect(() => {
    if (ctx == null) return;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(
      dogImage,
      0,
      0,
      frame * spriteWidth,
      spriteHeight,
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }, [frame]);

  useEffect(() => {
    if (ctx == null) return;
    let count = 0;
    const time = setInterval(() => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        dogImage,
        count * spriteWidth,
        spriteHeight,
        spriteWidth,
        spriteHeight,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
      if (count < 6) count++;
      else count = 0;
    }, 60);

    return () => {
      clearInterval(time);
    };
  }, [ctx]);

  useEffect(() => {
    if (canvas == null) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    setCtx(canvas.getContext("2d"));
  }, [canvas]);

  useEffect(() => {
    setCanvas(document.getElementById("canvas"));
  }, []);

  return (
    <canvas
      id="canvas"
      style={{
        position: "fixed",
        bottom: "10px",
        right: "10px",
        width: "70px",
        height: "70px",
        border: "1px solid black",
      }}
    >
      Here
    </canvas>
  );
};
