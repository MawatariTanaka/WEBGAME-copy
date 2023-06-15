import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import MemoryGame from "./pages/memory_game";
import RockPaperScissors from "./pages/rock_paper_scissors";

function App() {
  return (
    <div>
      <AppProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Game1" element={<MemoryGame />} />
          <Route path="/Game2" element={<RockPaperScissors />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <AnimateDog />
      </AppProvider>
    </div>
  );
}

export default App;

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Not Found");
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);
  return (
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

