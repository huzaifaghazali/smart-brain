import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center mv4'>
      <div className='absolute mt2'>
        <img src={imageUrl} alt='detect face' />
      </div>
    </div>
  );
};

export default FaceRecognition;
