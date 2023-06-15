import React from "react";
import "../scss/Css/SingleCard.css";

const SingleCard = ({ card, click, flipped, choicing }) => {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="" />
        <img
          onClick={() => {
            if (!choicing){
                click(card)
            }
          }}
          className="back"
          src="./imgs/cover.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default SingleCard;
