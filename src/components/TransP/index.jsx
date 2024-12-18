

import React, { useState } from 'react';
import './style.css';
import { Table, Input, Space, Radio, Dropdown, Menu, Button, Pagination } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useTransactions } from '../Context/index';

const { Search } = Input;

const Index = () => {
  const { transactions, loading } = useTransactions();
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(''); 
  const [sortOrder, setSortOrder] = useState('descend'); 
  const [filterType, setFilterType] = useState('');

  // Menu items for type filter dropdown
  const menu = (
    <Menu onClick={(e) => setFilterType(e.key)}>
      <Menu.Item key="income">Income</Menu.Item>
      <Menu.Item key="expense">Expense</Menu.Item>
    </Menu>
  );

  // Filter transactions based on searchText and type
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.name.toLowerCase().includes(searchText.toLowerCase()) &&
           (filterType ? transaction.type === filterType : true);
  });

  // Sort transactions based on selected option and order
  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortBy === 'sort-amount') {
      return sortOrder === 'ascend' ? a.amount - b.amount : b.amount - a.amount;
    } else if (sortBy === 'sort-date' || !sortBy) {
      return sortOrder === 'ascend' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    }
    return 0; 
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount}`,
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sortBy === 'sort-amount' ? sortOrder : null, 
      onHeaderCell: () => ({
        onClick: () => {
          setSortBy('sort-amount');
          setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
        },
      }),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortOrder: sortBy === 'sort-date' ? sortOrder : null, 
      
    },
  ];

  const handleClearAll = () => {
    setSearchText('');
    setSortBy('');
    setSortOrder('descend');
    setFilterType('');
  };

  return (
    <>
      <p className="head">Transaction History</p>
      <div className="table">
        <div className="table-header">
          {/* Search Bar */}
          <div className="search">
            <Space>
              <Search
                placeholder="Search by Name"
                enterButton
                onSearch={(value) => setSearchText(value)}
                allowClear
              />
            </Space>
          </div>

          <div className="sort">
            <Radio.Group value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <Radio.Button value="sort-amount">Sort by Amount</Radio.Button>
              <Radio.Button value="sort-date">Sort by Date</Radio.Button>
              <Radio.Button value="" onClick={handleClearAll}>Clear All</Radio.Button>
            </Radio.Group>
          </div>

          {/* Dropdown Filter for Type */}
          <div className="filters">
            <Dropdown overlay={menu}>
              <a onClick={(e) => e.preventDefault()}>
                <Space size={"middle"} className='filter'>
                  Type
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={sortedTransactions}
          loading={loading}
          rowKey={(record) => record.id || `${record.date}-${record.name}`}
          pagination={{ pageSize: 6 }}
        />
      </div>
    </>
  );
};

export default Index;
