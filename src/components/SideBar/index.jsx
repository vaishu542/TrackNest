import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChartLine, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import UserDetails from '../UserDetails';

const Index = ({ name: Component }) => {
    return (
        <div className='main-page'>
            <div className='side-bar'>
                <div className="user-details">
                    <UserDetails />
                </div>
                <div className="side-context">
                    <ul>
                        <li>
                            <NavLink
                                to='/mainPage'
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <span id='icon'><FontAwesomeIcon icon={faHouse} /></span>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/transactions'
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <span id='icon'><FontAwesomeIcon icon={faMoneyBillTransfer} /></span>
                                <span>Transactions</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/dash'
                                className={({ isActive }) => (isActive ? 'active' : '')}
                            >
                                <span id='icon'><FontAwesomeIcon icon={faChartLine} /></span>
                                <span>Statistics</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='main-details'>
                <Component /> 
            </div>
        </div>
    );
};

export default Index;
