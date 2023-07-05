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

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = process.env.REACT_APP_CLARIFAI_API_PAT;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID =  process.env.REACT_APP_CLARIFAI_API_USER_ID;       
const APP_ID =  process.env.REACT_APP_CLARIFAI_API_APP_ID;
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';  
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
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
  };

  console.log(APP_ID, USER_ID, PAT);

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
