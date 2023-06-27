import React, { useEffect, useState } from 'react'
import Modal from '../pages/rock_paper_scissors/Modal';
import Clock from './Clock';

const Footer = () => {
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    return (
        <>
            <footer className="footer">
                <div className="attribution">
                    Challenge by Mindx . Coded by Nhóm anh em
                </div>
                <Clock />
                {/* <AnimateDog /> */}
                {/* <button className="rules" onClick={toggle}>
                    Rules
                </button> */}
            </footer>
            {modal ? <Modal toggle={toggle} /> : null}
        </>
    )
}

export default Footer;

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
          left: "200px",
          width: "70px",
          height: "70px",
          border: "1px solid black",
        }}
      >
        Here
      </canvas>
    );
  };