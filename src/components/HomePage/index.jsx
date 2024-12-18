import React from 'react';
import "./style.css";
import Header from '../Header';
import signupimg from '../../assets/signup.jpg';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const signin = () => {
    navigate('/signup');

  }
  return (
    <div>
      <Header />
      <div className="main">
        <div className="image-container">
          <img src={signupimg} alt="signup" />
          <div className="overlay-text">
            <h1 > Welcome to TrackNest</h1>
            <p>– the easy way to manage your money. Track expenses, set budgets, and gain insights to build a secure financial future, one step at a time</p>
            <button className='signUp-btn' onClick={signin}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
