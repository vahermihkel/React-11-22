
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';

function App() {
  return (
    <div className="App">

      <Link to="/">
        <img className="pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      </Link>

      <Link to="/lisa-toode">
        <button className="nupp">Lisa toode</button>
      </Link>
      
      <Link to="/ostukorv">
        <button className="nupp">Ostukorvi</button>
      </Link>

      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
      </Routes>
    </div>
  );
}

export default App;






// kahte liiki vead
// 1. kompileerimise vead (koodi kokkupakkimine/ülevaatus)
// * neid on näha cmd-s (seal kus on käimas npm start)
// * leht läheb tumeda taustaga ja tuleb selgitus, mis on valesti

// 2. run-time (vead brauseris)
// * neid on näha brauseris parem hiireklõps -> inspect -> console
// * leht on valge ja mitte midagi pole näha
// * need on väga hästi guugeldatavad (Stack OverFlow)

