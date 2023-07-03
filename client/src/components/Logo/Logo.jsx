import React from 'react';
import Tilt from 'react-parallax-tilt';

import brain from './brain.png';
import './logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilt
        className='Tilt br2 shadow-2'
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className='pa3'>
          <img alt='logo' style={{ paddingTop: '5px' }} src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
