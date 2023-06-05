import React, { useContext, useEffect, useState } from "react";
import "../Css/Home.css";
import SingleCard from "../Components/SingleCard";
import Timer from "../Components/Timer";
import Dialog from "../Components/Dialog";
import { AppContext } from "../Contexts/AppContext";

// Mỗi màn sẽ có số card khác nhau
const cardsImage = [
  { src: "./imgs/helmet-1.png", matched: false },
  { src: "./imgs/potion-1.png", matched: false },
  { src: "./imgs/ring-1.png", matched: false },
  { src: "./imgs/scroll-1.png", matched: false },
  { src: "./imgs/shield-1.png", matched: false },
  { src: "./imgs/sword-1.png", matched: false },
];

const Home = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [choicing, setChoicing] = useState(false);
  const [statusGame, setStatusGame] = useState({status: ''});
  const {setShowDialog} = useContext(AppContext);

  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardsImage, ...cardsImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
    setStatusGame({status: 'play'});
    console.log(statusGame);
  };

  const handleSelected = (card) => {
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
    setStatusGame({status: 'pause'});
    setShowDialog(true);
  };

  const handleResumeGame = () => {
    setStatusGame({status: 'resume'})
  };

  const handleGameOver = (resut) => {
    setShowDialog(resut);
  };

  return (
    <div className="container">
      <h1>Memory Game {<Timer status={statusGame} GameOver={handleGameOver}/>}</h1>
      <button onClick={shuffleCards}>Play Game</button>
      <button onClick={handlePauseGame}>Pause Game</button>
      <button onClick={handleResumeGame}>Resume Game</button>
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
      <Dialog/>
    </div>
  );
};

export default Home;
