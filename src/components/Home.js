import React from 'react';
import thinkingboy from '../images/thinkingboy.png';
import './Home.css';

const Home = () => {
  return (
    <div className="home-content">
      <div className="title">
        React<br/>Card<br/>Game
      </div>
      <div className="thinking-boy">
        <img src={thinkingboy} alt="thinking-man"></img>
      </div>
    </div>
  )
}

export default Home;