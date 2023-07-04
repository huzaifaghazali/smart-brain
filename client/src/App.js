import ParticlesBg from 'particles-bg';
import './App.css';

import { Navigation, Logo, ImageLinkForm, Rank, FaceRecognition } from './components';
function App() {
  return (
    <div className='App'>
      <ParticlesBg color='#ffffff'  type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* 
    <FaceRecognition /> */}
    </div>
  );
}

export default App;
