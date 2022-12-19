import { useState } from 'react';
import { Link } from 'react-router-dom';

function Ostukorv() {
  const [ostukorv, uuendaOstukorv] = useState(JSON.parse(localStorage.getItem("ostukorv")) || []);

  const kustuta = (i) => {
    ostukorv.splice(i,1); //kustutamiseks
    console.log(ostukorv);
    uuendaOstukorv(ostukorv.slice()); // HTML uueneb
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // salvestuseks
  }

  const tyhjenda = () => {
    //ostukorv.splice(0);
    uuendaOstukorv([]);
    localStorage.setItem("ostukorv", JSON.stringify([]));
  }

  const lisa = (klikitudToode) => {
    ostukorv.push(klikitudToode);
    uuendaOstukorv(ostukorv.slice()); // HTML uueneb
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // salvestuseks
  }

  const arvutaKogusumma = () => {
    let kogusumma = 0;
    // [{"n": "Coca", "h": 5},{"n": "Fanta", "h": 3},{"n": "Sprite", "h": 4}]
    //  {"n": "Coca", "h": 5} =>   5   =   0  + 5
    //  {"n": "Fanta", "h": 3} =>    8   =   5  +  3
    //  {"n": "Sprite", "h": 4} =>    12    =    8   +  4
    ostukorv.forEach(element => kogusumma = kogusumma + element.hind);
    return kogusumma;
  }

  return ( 
    <div>
      {ostukorv.length === 0 && 
        <div>
          <div>Ostukorv on tühi</div>
          <Link to="/">
            Mine tooteid lisama
          </Link>
        </div>}
      {ostukorv.length === 1 && <div>Ostukorvis on 1 ese</div>}
      {ostukorv.length >= 2 && <div>Ostukorvis on {ostukorv.length} eset</div>}
      {ostukorv.length > 0 && <button onClick={tyhjenda}>Tühjenda</button> }
      {ostukorv.map((element,i) => 
        <div key={i}>
          <img src={element.pilt} alt="" />
          <div>{element.nimi}</div>
          <div>{element.hind} €</div>
          <button onClick={() => kustuta(i)}>x</button>
          <button onClick={() => lisa(element)}>+</button>
        </div>)}
      
      <div>{arvutaKogusumma()} €</div>
    </div>  
    );
}

export default Ostukorv;
