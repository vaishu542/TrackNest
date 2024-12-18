import React from 'react';
import './style.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useTransactions } from '../Context';
import noExpenseImg from '../../assets/expense.png';

const ExpensePieChart = () => {
  const { transactions } = useTransactions();

  // Filter only expense transactions
  const expenses = transactions.filter((t) => t.type === 'expense');
  const hasExpenses = expenses.length > 0;

  // Grouping expenses by category
  const categoryTotals = expenses.reduce((acc, curr) => {
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
      <p>Expenses by Category</p>
      {hasExpenses ? (
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
        <div className="no-expense-placeholder data" style={{ textAlign: 'center' }}>
          <img
            src={noExpenseImg}
            alt="No Expenses"
          />
          <span>No expenses to show yet!</span>
        </div>
      )}
    </div>
  );
};

export default ExpensePieChart;
