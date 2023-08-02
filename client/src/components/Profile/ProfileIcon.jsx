import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import PIcon from '../../assets/images/profileIcon1.svg';

const ProfileIcon = ({ onRouteChange, toggleModal }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggle = () => setDropDownOpen((prevState) => !prevState);

  // Define the logout function to remove the session token and perform logout actions
  const logout = () => {
    // Remove the session token from sessionStorage
    window.sessionStorage.removeItem('token');
    onRouteChange('signout');
  };

  return (
    <div className='pa4 tc'>
      <Dropdown isOpen={dropDownOpen} toggle={toggle}>
        <DropdownToggle data-toggle='dropdown' tag='span'>
          <img src={PIcon} className='br-100 ba h3 w3 dib' alt='avatar' />
        </DropdownToggle>
        <DropdownMenu dark className='o-60 shadow-5'>
          <DropdownItem onClick={toggleModal}>View Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem  onClick={logout}>
            Signout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
