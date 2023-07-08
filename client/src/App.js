import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import './App.css';

import {
  Navigation,
  Logo,
  ImageLinkForm,
  Rank,
  FaceRecognition,
  Signin,
  Register,
} from './components';

const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = process.env.REACT_APP_CLARIFAI_PAT;
  const USER_ID = process.env.REACT_APP_CLARIFAI_USER_ID;
  const APP_ID = process.env.REACT_APP_CLARIFAI_APP_ID;
  // const MODEL_ID = 'face-detection';
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
  route: 'signin',
};

function App() {
  const [state, setState] = useState(initialState);

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setState((prevState) => ({ ...prevState, box: box }));
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
      .then((result) => displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log('error', error));
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setState(initialState);
    } else if (route === 'home') {
      setState((prevState) => ({ ...prevState, isSignedIn: true }));
    }
    setState((prevState) => ({ ...prevState, route: route }));
  };

  return (
    <div className='App'>
      <ParticlesBg color='#ffffff' type='cobweb' bg={true} />
      <Navigation onRouteChange={onRouteChange} />
      {state.route === 'home' ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={state.box} imageUrl={state.imageUrl} />
        </div>
      ) : state.route === 'signin' ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
