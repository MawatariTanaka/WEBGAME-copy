import React from "react";
// import { AppContext } from "../contexts/AppContext";
import { Card, Col, Row } from 'antd';
import { useNavigate } from "react-router-dom";
import preview from '../images/memory_game/preview.png';
import preview1 from '../images/rock_paper_scissors/image-rules.svg';

const Home = () => {
  // const { modeStyle } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Row >
      <Col>
        <Card
          hoverable
          style={{ height: 311, width: 240, marginTop: 30, marginLeft: 20}}
          cover={<img alt="Game 1" src={preview} />}
          onClick={() => { navigate('/Game1') }}
        >
          Memory Game
        </Card>
      </Col>

      <Col >
        <Card
          hoverable
          style={{ height: 311, width: 240, marginTop: 30, marginLeft: 20 }}
          cover={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 240 }}> <img style={{ width: 200, height: 200 }} alt="Game 2" src={preview1} /> </div>}
          onClick={() => { navigate('/Game2') }}
        >
          Rock Paper Scissors Game
        </Card>
      </Col>

    </Row>
  );
};

export default Home;