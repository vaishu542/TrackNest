import React from 'react'
import Header from '../components/Header';
import TransP from '../components/TransP';
import SideBar from '../components/SideBar';

const Transactions = () => {

  return (
    <div>
      <Header />
      <SideBar name={TransP} />
    </div>
  )
}

export default Transactions;

