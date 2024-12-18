import React from 'react';
import './style.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTransactions } from '../Context';
import noIncomeImg from '../../assets/income.png';

const IncomePieChart = () => {
  const { transactions } = useTransactions();

  // Filtering income transactions
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const hasIncome = incomeTransactions.length > 0;

  const categoryTotals = incomeTransactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});


  const pieData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const COLORS = ['#ff8042', '#00C49F', '#FFBB28', '#8e44ad'];

  return (
    <div className="income-expense">
      <p>Income by Category</p>
      {hasIncome ? (
        <PieChart width={500} height={350}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={140}
            fill="#8884d8"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <div className="no-income data">
          <img src={noIncomeImg} alt="No income" />
          <span>No income transactions yet!</span>
        </div>
      )}
    </div>
  );
};

export default IncomePieChart;
