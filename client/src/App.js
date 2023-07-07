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
  const IMAGE_URL = imageUrl;
  // const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

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
  imageUrl: '',
  box: {},
};

function App() {
  const [state, setState] = useState(initialState);

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    console.log(width, height);
  };

  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  const onButtonSubmit = () => {
    setState((prevState) => ({ ...prevState, imageUrl: state.input }));

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/outputs`,
      returnClarifaiRequestOptions(state.input)
    )
      .then((response) => response.json())
      .then((result) => calculateFaceLocation(result))
      .catch((error) => console.log('error', error));
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
      <FaceRecognition imageUrl={state.imageUrl} />
    </div>
  );
}

export default App;
