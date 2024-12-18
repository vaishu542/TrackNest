import React from 'react';
import Header from '../components/Header';
import MainP from '../components/MainP';
import SideBar from '../components/SideBar';

const MainPage = () => {
  return (
    <div>
      <Header />
      <SideBar name={MainP} />
    </div>
  );
};

export default MainPage;
