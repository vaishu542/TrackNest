import React from 'react'
import './style.css'
import ExpensePieChart from '../PieCharts/ExpensePieChart';
import IncomePieChart from '../PieCharts/IncomePieChart';

const index = () => {
  return (
    <>
      <div className="head">
        Statistics
      </div>
      <div className='charts'>
        <ExpensePieChart />
        <IncomePieChart />
      </div>
    </>
  )
}

export default index
