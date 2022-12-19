import { useState } from "react";
import { Link } from "react-router-dom";

function Tooted() {
  const [tooted, setTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

  const lisaOstukorvi = (klikitudToode) => {
    // console.log(klikitudToode);
    let ostukorvLS = localStorage.getItem("ostukorv");
    ostukorvLS = JSON.parse(ostukorvLS) || [];
    ostukorvLS.push(klikitudToode);
    ostukorvLS = JSON.stringify(ostukorvLS);
    localStorage.setItem("ostukorv", ostukorvLS);
  }

  const filtreeri = (klikitudT2ht) => {
    // const tulem = tooted.filter(element => element.nimi.charAt(0) === klikitudT2ht);
    const tulem = tooted.filter(element => element.nimi.startsWith(klikitudT2ht));
    setTooted(tulem);
  }

  // JS get unique values in array
  const esiT2hed = [...new Set(tooted.map(element => element.nimi.charAt(0)))];

  return ( 
    <div>
      {/* <button onClick={() => filtreeri("H")}>H</button>
      <button onClick={() => filtreeri("P")}>P</button>
      <button onClick={() => filtreeri("T")}>T</button> */}
      {/* SORTEERI NIME JÄRGI A-Z */}
      {/* SORTEERI NIME JÄRGI Z-A */}
      {/* SORTEERI HINNA JÄRGI KASVAVALT */}
      {/* SORTEERI HINNA JÄRGI KAHANEVALT */}
      { esiT2hed.map(element => 
        <button key={element} onClick={() => filtreeri(element)}>
          {element}
        </button>) }
      {tooted.filter(element => element.aktiivne === true).map((element,i) => 
        <div key={i}>
          <Link to={"/toode/" + i}>
            <img src={element.pilt} alt="" />
            <div>{element.nimi}</div>
            <div>{element.hind} €</div>
          </Link>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>)}
    </div> );
}

export default Tooted;