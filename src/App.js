import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import { ChatProvider } from "./contexts/chatContext";
import Header from "./components/Header";
import Home from "./pages";
import Login from "./pages/rock_paper_scissors/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Footer from "./components/Footer";
import MemoryGame from "./pages/memory_game";
import RockPaperScissors from "./pages/rock_paper_scissors";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4PKIP7LXVv9oTe9y2zQKzFaUMVAneJ6Y",
    authDomain: "chat-app-639ce.firebaseapp.com",
    projectId: "chat-app-639ce",
    storageBucket: "chat-app-639ce.appspot.com",
    messagingSenderId: "702439026592",
    appId: "1:702439026592:web:f358bbeee1db54d5edfec5",
    measurementId: "G-53QZVF10PB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, []);
    return <div>404</div>;
};

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.signOut();
    }, []);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });

    const PrivateRoute = ({ user, children }) => {
        return user ? children : <Navigate to="/Login" />;
    };

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
                            element={
                                <PrivateRoute
                                    user={user}
                                    element={<RockPaperScissors />}
                                />
                            }
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
