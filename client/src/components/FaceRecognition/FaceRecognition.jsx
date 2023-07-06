import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='center mv4'>
      <img src={imageUrl} alt='detect face' />
    </div>
  );
};

export default FaceRecognition;
