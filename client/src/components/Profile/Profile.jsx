import React from 'react';
import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal }) => {
  return (
    <div className='profile-modal '>
      Profile
      <button onClick={toggleModal}>Click</button>
    </div>
  );
};

export default Profile;
