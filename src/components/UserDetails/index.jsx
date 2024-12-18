import React from 'react';
import { useUser } from '../Context/UserContext';
import './style.css';
import noprofile from '../../assets/no-profile.png';
import { Tooltip } from 'antd';


const Index = () => {
  const { userDetails } = useUser();
  console.log("user", userDetails);

  return (
    <div className='details'>
      <div className="user-photo">
        <Tooltip title={userDetails?.email || 'Not available'} placement="right">
          {userDetails?.photoURL ? (
            <img
              src={userDetails.photoURL}
              alt="User Photo"
              className="photo"
            />
          ) : (
            <img
              src={noprofile}
              alt="User Photo"
              className="photo"
            />
          )}
        </Tooltip>
      </div>
      <p >{userDetails?.name || 'Guest'}</p>
    </div>
  );
};

export default Index;
