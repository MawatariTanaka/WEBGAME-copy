import React  from "react";
// import { AppContext } from "../contexts/AppContext";
import { Button } from 'antd';
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const { modeStyle } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <Button type="primary" onClick={() => {navigate('/Game1')}}>Memory Game</Button>
      <Button type="primary" onClick={() => {navigate('/Game2')}}>Rock Paper Scissors Game</Button>
    </div>
  );
};

export default Home;