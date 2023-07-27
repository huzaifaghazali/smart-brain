import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ParticlesBg from 'particles-bg';
import {calculateFaceLocations} from './utils/faceLocation';

import 'react-toastify/dist/ReactToastify.css';
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

  const displayFaceBoxes = (boxes) => {
    setState((prevState) => ({ ...prevState, boxes: boxes }));
  };

  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  const onPictureSubmit = async () => {
    setState((prevState) => ({ ...prevState, imageUrl: state.input }));
  
    try {
      const response = await fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: state.input,
        }),
      });
  
      const result = await response.json();
      if (result) {
        const countResponse = await fetch('http://localhost:3001/image', {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: state.user.id,
          }),
        });
  
        const count = await countResponse.json();
  
        setState((prevState) => ({
          ...prevState,
          user: { ...prevState.user, entries: count },
        }));
      }
  
      console.log(result);
      displayFaceBoxes(calculateFaceLocations(result));
    } catch (error) {
      console.log('error', error);
    }
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
      <div className='particles o-70'>
        <ParticlesBg num={130} color='#ffffff' type='cobweb' bg={true} />
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
