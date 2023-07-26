import React, { useState } from 'react';
import PIcon from '../../assets/images/profileIcon1.svg';

const ProfileIcon = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  return (
    <div className='pa4 tc'>
      <img
        src={PIcon}
        className='br-100 ba h3 w3 dib'
        alt='avatar'
      />
    </div>
  );
};

export default ProfileIcon;
