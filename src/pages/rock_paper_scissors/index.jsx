import React, { useState, createContext, useReducer } from 'react';
import Header from './game/Header';
import Play from './game/Play';
import Game from './game/Game';
import Chatroom from "./chat_app/Components/Chatroom"

const initialState = {};

const gameDispatch = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const GameContext = createContext(initialState);

const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameDispatch, initialState);
    return (
        <GameContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

const RockPaperScissors = () => {
    const [myChoice, setMyChoice] = useState('');
    const [score, setScore] = useState(0);
    return (
        <GameProvider>
            <div className="container">
                <Chatroom />
                <div className="game-container">

                </div>
                {/* <Header score={score} /> 
                <Play setMyChoice={setMyChoice} />
                <Game myChoice={myChoice} score={score} setScore={setScore} /> */}
            </div>
        </GameProvider>
    );
};

export default RockPaperScissors;
