import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { AppProvider } from './contexts/AppContext';
import Home from './pages';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import MemoryGame from './pages/memory_game';
import RockPaperScissors from './pages/rock_paper_scissors';
import { ChatProvider } from './contexts/chatContext';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD4PKIP7LXVv9oTe9y2zQKzFaUMVAneJ6Y',
    authDomain: 'chat-app-639ce.firebaseapp.com',
    projectId: 'chat-app-639ce',
    storageBucket: 'chat-app-639ce.appspot.com',
    messagingSenderId: '702439026592',
    appId: '1:702439026592:web:f358bbeee1db54d5edfec5',
    measurementId: 'G-53QZVF10PB',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };

function App() {
    return (
        <div>
            <AppProvider>
                <ChatProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Game1" element={<MemoryGame />} />
                        <Route
                            path="/Game2"
                            element={<RockPaperScissors />}
                        ></Route>
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/About" element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Footer />
                </ChatProvider>
            </AppProvider>
        </div>
    );
}

export default App;

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Not Found');
        setTimeout(() => {
            navigate('/');
        }, 3000);
    }, []);
    return <div>Not Found</div>;
};
