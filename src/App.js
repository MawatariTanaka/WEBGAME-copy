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
          <Route path="/Game2" element={<RockPaperScissors />} >
            
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/About" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        
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