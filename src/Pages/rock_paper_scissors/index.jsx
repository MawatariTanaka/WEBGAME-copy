import React, { useState } from 'react'
import Header from './Header';
import Play from './Play';
import Game from './Game';
import { Route, Routes } from 'react-router-dom';

const RockPaperScissors = () => {
    const [myChoice, setMyChoice] = useState("");
    const [score, setScore] = useState(0);
    return (
        <>
            <div className="container">
                <Header score={score} />
                <Routes>
                    <Route path="/" element={<Play setMyChoice={setMyChoice} />} />
                    <Route
                        path="/game"
                        element={
                            <Game myChoice={myChoice} score={score} setScore={setScore} />
                        }
                    />
                </Routes>
            </div>
        </>
    )
}

export default RockPaperScissors;