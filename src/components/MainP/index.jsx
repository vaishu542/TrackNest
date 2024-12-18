import React, { useState } from 'react';
import "./style.css";
import { Card, Row, Modal, Form, Input, Select, Flex, Spin, Table, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useTransactions } from '../Context';
import { Tooltip } from 'antd';

const Index = () => {

  const { Option } = Select;
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [user] = useAuthState(auth);
  const [form] = Form.useForm();

  // Use the transactions context
  const {
    transactions,
    addTransaction,
    calculateBalance,
    loading
  } = useTransactions();


  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    form.submit(); // Trigger form submit programmatically
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setTransactionType(null); // Reset transaction type
  };

  const onTransactionTypeChange = (value) => {
    setTransactionType(value);
  };


  const onFinish = (values) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;

    const newTransaction = {
      type: transactionType,
      date: formattedDate,
      name: values.transactionName,
      category: values.expenseCategory || values.incomeCategory,
      amount: parseFloat(values.amount),

    };
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
    form.resetFields();
    setTransactionType(null); // Reset transaction type
    setConfirmLoading(true);
    // Use the context method to add transaction
    addTransaction(newTransaction);


  };



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
      render: (amount) => `₹${amount}`
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    }
  ];

  // Calculate balance using context method
  const { income, expense, balance } = calculateBalance();

  return (

    <>
      {loading ?
        <div className="spin">
          <Flex align="center" gap="middle">
            <Spin size="large" />
          </Flex>
        </div>
        :
        <div>
          <p className="head">
          My Wallet
          </p>
          <Row id="row">
            <div className="card">
              <Card title="Current Balance" bordered={false} className="card-detail">
                <p>₹{balance}</p>
              </Card>
            </div>
            <div className="card">
              <Card title="Income" bordered={false} className="card-detail">
                <p>₹{income}</p>
              </Card>
            </div>
            <div className="card">
              <Card title="Expenses" bordered={false} className="card-detail">
                <p>₹{expense}</p>
              </Card>
            </div>
          </Row>
          <div className="trans">
            <div className="card-trans">
              <Tooltip title="Add Transaction" placement="bottom">
                <Card title="" bordered={false} className="card-add" onClick={showModal}>
                  <p>
                    <PlusOutlined />
                  </p>
                </Card>
              </Tooltip>
              <>
                <Modal
                  title="Add Transaction"
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <Form
                    form={form}
                    layout="vertical"
                    requiredMark={false}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      label="Transaction Type"
                      name="transactionType"
                      rules={[{ required: true, message: 'Please select a transaction type!' }]}
                    >
                      <Select
                        placeholder="Select Transaction Type"
                        onChange={onTransactionTypeChange}
                      >
                        <Option value="income">Income</Option>
                        <Option value="expense">Expense</Option>
                      </Select>
                    </Form.Item>

                    {transactionType === "expense" ?
                      <Form.Item
                        label="Category"
                        name="expenseCategory"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                      >
                        <Select placeholder="Select Category">
                          <Option value="food">Food</Option>
                          <Option value="entertainment">Entertainment</Option>
                          <Option value="travel">Travel</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>
                      : //else 
                      <Form.Item
                        label="Category"
                        name="incomeCategory"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                      >
                        <Select placeholder="Select Category">
                          <Option value="salary">Salary</Option>
                          <Option value="freelance">Freelance</Option>
                          <Option value="stocks">Stocks / Investments</Option>
                          <Option value="other">Other</Option>
                        </Select>
                      </Form.Item>}

                    <Form.Item
                      label="Transaction Name"
                      name="transactionName"
                      rules={[{ required: true, message: 'Please enter a transaction name!' }]}
                    >
                      <Input placeholder="Enter Transaction Name" />
                    </Form.Item>

                    <Form.Item
                      label="Amount"
                      name="amount"
                      rules={[
                        { required: true, message: 'Please enter an amount!' },
                        { type: 'number', min: 0, message: 'Amount must be a positive number!', transform: (value) => Number(value) },
                      ]}
                    >
                      <Input placeholder="Enter amount" type="number" />
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            </div>
            <div className="trans-table">

              <Table
                columns={columns}
                dataSource={transactions.slice(-5)} // Takes the last 5 transactions
                loading={loading}
                pagination={false}
                size="small"
                title={() => (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className='title'>Recent Transactions</p>
                  </div>
                )}
                rowKey={(record) => record.id || `${record.date}-${record.name}-${Math.random()}`}
              />
            </div>
          </div>
        </div>}

    </>

  );
};

export default Index;


