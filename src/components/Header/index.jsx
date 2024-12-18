import React, { useEffect } from 'react';
import "./style.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import loginImg from '../../assets/log-in.svg';
import logoutImg from '../../assets/log-out.svg';


const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const home = () => {
    navigate('/mainPage'); 
  };

  const logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
      toast.success("Logged Out Successfully! ");
    }).catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
  }

  const login = () =>{
    navigate('/login');
  }


  return (
    <div className='navBar'>
      <p onClick={home}>TrackNest</p>
      {user ? (
        <div className="status-container" onClick={logout}>
          <img src={logoutImg} alt="logout"/>
          <span className='status'>Logout</span>
        </div>
      ) : (
        <div className="status-container" onClick={login}>
          <img src={loginImg} alt="login" />
          <span className='status'>LogIn</span>
        </div>
      )}

    </div>
  );
};

export default Header;
