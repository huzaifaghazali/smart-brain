import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ParticlesBg from 'particles-bg';
import { toast } from 'react-toastify';
import { calculateFaceLocations } from './utils/faceLocation';

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
  Modal,
  Profile,
} from './components';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: '',
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
        pet: data.pet,
        age: data.age,
      },
    }));
  };

  const displayFaceBoxes = (boxes) => {
    if(boxes) {
      setState((prevState) => ({ ...prevState, boxes: boxes }));
    }
  };

  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  const onPictureSubmit = async () => {
    if (state.input === '') {
      toast.error('Please enter Image Link');
      return;
    }

    setState((prevState) => ({ ...prevState, imageUrl: state.input }));

    try {
      const response = await fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token'),
        },
        body: JSON.stringify({
          input: state.input,
        }),
      });

      const result = await response.json();

      if (result) {
        const countResponse = await fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token'),
          },
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
      toast.error('Unauthorized')
      console.log('error', error);
    }
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      return setState(initialState);
    } else if (route === 'home') {
      setState((prevState) => ({ ...prevState, isSignedIn: true }));
    }
    setState((prevState) => ({ ...prevState, route: route }));
  };

  const toggleModal = () => {
    setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  useEffect(() => {
    async function fetchData() {
      // Get the token from session
      const token = window.sessionStorage.getItem('token');

      if (token) {
        try {
          const signinResponse = await fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });

          const signinData = await signinResponse.json();

          if (signinData && signinData.id) {
            const profileResponse = await fetch(
              `http://localhost:3001/profile/${signinData.id}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              }
            );
            const user = await profileResponse.json();
            if (user && user.email) {
              loadUser(user);
              onRouteChange('home');
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <div className='App'>
      <div className='particles o-70'>
        <ParticlesBg num={130} color='#ffffff' type='cobweb' bg={true} />
      </div>
      <Navigation
        isSignedIn={state.isSignedIn}
        onRouteChange={onRouteChange}
        toggleModal={toggleModal}
      />
      {state.isProfileOpen && (
        <Modal>
          <Profile
            isProfileOpen={state.isProfileOpen}
            toggleModal={toggleModal}
            user={state.user}
            loadUser={loadUser}
          />
        </Modal>
      )}

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
