import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = ({onInputChange, onPictureSubmit}) => {
  return (
    <div>
      <p className='f3 b'>
        {'This Magic Brain will detect faces in your pictures. Give it a try'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-3'>
          <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} placeholder='Please enter the link of image'/>
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
