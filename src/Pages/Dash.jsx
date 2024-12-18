import React from 'react'
import Header from '../components/Header';
import DashP from '../components/DashP';
import SideBar from '../components/SideBar';
const Dash = () => {
  return (
    <div>
      <Header />
      <SideBar name={DashP} />
    </div>
  )
}

export default Dash
