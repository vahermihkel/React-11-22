import { useState } from "react";

function Seaded() {
  const [keel, muudaKeel] = useState(localStorage.getItem("keel") || "ee");

  const uuendaKeelEE = () => {
    muudaKeel("ee");
    localStorage.setItem("keel", "ee");
  }

  const uuendaKeelEN = () => {
    muudaKeel("en");
    localStorage.setItem("keel", "en");
  }

  const uuendaKeelRU = () => {
    muudaKeel("ru");
    localStorage.setItem("keel", "ru");
  }

  return ( 
    <div>
      <button onClick={uuendaKeelEE}>EE</button>
      <button onClick={uuendaKeelEN}>EN</button>
      <button onClick={uuendaKeelRU}>RU</button>
      { keel === "ee" && <div>Veebilehe keel on eesti</div>}
      { keel === "en" && <div>Veebilehe keel on inglise</div>}
      { keel === "ru" && <div>Veebilehe keel on vene</div>}
    </div> );
}

export default Seaded;