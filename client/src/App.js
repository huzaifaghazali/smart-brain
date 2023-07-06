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

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = process.env.REACT_APP_CLARIFAI_PAT;
  const USER_ID = process.env.REACT_APP_CLARIFAI_USER_ID;
  const APP_ID = process.env.REACT_APP_CLARIFAI_APP_ID;
  const MODEL_ID = 'face-detection';
  // const IMAGE_URL = imageUrl;
  const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  return {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: 'Key ' + PAT,
    },
    body: raw,
  };
};


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
    fetch(
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      returnClarifaiRequestOptions(
        'https://samples.clarifai.com/metro-north.jpg'
      )
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  // console.log(process.env.REACT_APP_CLARIFAI_PAT,
  //   process.env.REACT_APP_CLARIFAI_USER_ID,
  //   process.env.REACT_APP_CLARIFAI_APP_ID,
  //   process.env.REACT_APP_CLARIFAI_API_KEY);

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
      <FaceRecognition />
    </div>
  );
}

export default App;
