import './App.css';
import ParticlesBg from 'particles-bg';

import { Navigation, Logo, ImageLinkForm, FaceRecognition } from './components';
function App() {
  return (
    <div className='App'>
      <ParticlesBg  type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      {/* 
    <ImageLinkForm />
    <FaceRecognition /> */}
    </div>
  );
}

export default App;
