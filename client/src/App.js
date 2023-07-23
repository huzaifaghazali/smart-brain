import { useState } from 'react';
import ParticlesBg from 'particles-bg';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import {
  Navigation,
  Logo,
  ImageLinkForm,
  Rank,
  FaceRecognition,
  Signin,
  Register,
} from './components';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  },
};

function App() {
  const [state, setState] = useState(initialState);

  const loadUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    }));
  };

  const calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  const displayFaceBoxes = (boxes) => {
    setState((prevState) => ({ ...prevState, boxes: boxes }));
  };

  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  const onPictureSubmit = () => {
    setState((prevState) => ({ ...prevState, imageUrl: state.input }));

    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: state.input,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setState((prevState) => ({
                ...prevState,
                user: { ...prevState.user, entries: count },
              }));
            })
            .catch(console.log);
        }
        console.log(result);
        displayFaceBoxes(calculateFaceLocations(result));
      })
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
      <div className='particles'>
        <ParticlesBg color='#ffffff' type='cobweb' bg={true} />
      </div>
      <Navigation isSignedIn={state.isSignedIn} onRouteChange={onRouteChange} />
      {state.route === 'home' ? (
        <div>
          <Logo />
          <Rank name={state.user.name} entries={state.user.entries} />
          <ImageLinkForm
            onInputChange={onInputChange}
            onPictureSubmit={onPictureSubmit}
          />
          <FaceRecognition boxes={state.boxes} imageUrl={state.imageUrl} />
        </div>
      ) : state.route === 'signin' ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
      <ToastContainer position='top-center' theme='dark' />
    </div>
  );
}

export default App;
