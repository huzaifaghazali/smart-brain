import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';

import {
  Navigation,
  Logo,
  ImageLinkForm,
  Rank,
  FaceRecognition,
} from './components';

const initialState = {
  input: '',
};

function App() {
  const [state, setState] = useState(initialState);

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  const onButtonSubmit = () => {
    console.log('clicked');
  };

  return (
    <div className='App'>
      <ParticlesBg color='#ffffff' type='cobweb' bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      {/* 
    <FaceRecognition /> */}
    </div>
  );
}

export default App;
