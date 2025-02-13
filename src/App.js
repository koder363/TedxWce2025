import './App.css';
import YoutubePlayer from './YoutubePlayer';
import Nav from './Nav';
import OurTeam from './OurTeam/OurTeam';
import Sponsor from './Sponsors/Sponsor';
import Footer from './Footer/Footer';
import GlassCard from './Test';
import Landingpage3d from './3dElements/Landingpage3d';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav/>
        <Landingpage3d/>
        <OurTeam/>
        <Footer/>
        {/* <YoutubePlayer/>
        
        <Sponsor/>
        
        <GlassCard/> */}

      </header>
    </div>
  );
}

export default App;
