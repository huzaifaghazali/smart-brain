import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import PIcon from '../../assets/images/profileIcon1.svg';

const ProfileIcon = ({ onRouteChange }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggle = () => setDropDownOpen((prevState) => !prevState);

  return (
    <div className='pa4 tc'>
      <Dropdown isOpen={dropDownOpen} toggle={toggle}>
        <DropdownToggle data-toggle='dropdown' tag='span'>
          <img src={PIcon} className='br-100 ba h3 w3 dib' alt='avatar' />
        </DropdownToggle>
        <DropdownMenu dark className='o-60 shadow-5'>
          <DropdownItem>View Profile</DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={() => onRouteChange('signout')}>
            Signout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;
