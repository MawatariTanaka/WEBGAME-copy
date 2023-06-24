import React, { useContext, useEffect, useRef, useState } from "react";
import "../../scss/Css/Home.css";
import SingleCard from "../../components/SingleCard";
import Timer from "../../components/Timer";
import Dialog from "../../components/Dialog";
import { AppContext } from "../../contexts/AppContext";
import { Button } from "antd";
import sound_bg from '../../sound/bgMemory.mp3';
import sound_click from '../../sound/flip_sound.mp3';
import sound_win from '../../sound/win.mp3';
import sound_lose from '../../sound/lose.mp3';
import useSound from 'use-sound';

// Mỗi màn sẽ có số card khác nhau
const cardsImage = [
  { src: "./imgs/helmet-1.png", matched: false },
  { src: "./imgs/potion-1.png", matched: false },
  { src: "./imgs/ring-1.png", matched: false },
  { src: "./imgs/scroll-1.png", matched: false },
  { src: "./imgs/shield-1.png", matched: false },
  { src: "./imgs/sword-1.png", matched: false },
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [choicing, setChoicing] = useState(false);
  const { setShowDialog, setStatusGame, statusGame, setIsPlaying } = useContext(AppContext);

  const [play, { stop, pause }] = useSound(sound_bg, {
    loop: true,
    onplay: () => {setIsPlaying(true)},
    onend: () => {setIsPlaying(false)}
  });

  const [play_click] = useSound(sound_click);
  const [play_win] = useSound(sound_win);
  const [play_lose] = useSound(sound_lose);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImage, ...cardsImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
    setStatusGame('play');
    setShowDialog(false);

    play();
  };

  const handleSelected = (card) => {
    play_click();
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  // so sanh 2 card
  useEffect(() => {
    if (choice1 && choice2) {
      setChoicing(true);
      if (choice1.src === choice2.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoice();
        setStatusGame('win')
        setShowDialog(true);
        stop();
        play_win();
      } else {
        setTimeout(() => {
          resetChoice();
        }, 1000);
      }
    }
  }, [choice1, choice2]);

  // reset choice, inc turns
  const resetChoice = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(turns + 1);
    setChoicing(false);
  };

  const handlePauseGame = () => {
    setStatusGame('pause');
    setShowDialog(true);
    pause();
  };

  const handleResumeGame = () => {
    setStatusGame('resume');
    setShowDialog(false);
    play();
  };

  const handleGameOver = () => {
    stop();
    play_lose();
  };

  // Bật menu
  useEffect(() => {
    setStatusGame('menu');
    setShowDialog(true);
  }, []);

  return (
    <div className="container">
      <h1>Memory Game <Timer overTime={handleGameOver}/></h1>
      <Button onClick={() => handlePauseGame()}>Pause Game</Button>
      <div className="card-gird">
        {cards.map((card, index) => (
          <SingleCard
            key={index}
            card={card}
            click={handleSelected}
            flipped={card === choice1 || card === choice2 || card.matched}
            choicing={choicing}
          />
        ))}
      </div>
      <Dialog shuffleCards={shuffleCards} handlePauseGame={handlePauseGame} handleResumeGame={handleResumeGame} />
    </div>
  );
};

export default MemoryGame;
