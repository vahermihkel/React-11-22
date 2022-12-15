import { useState } from "react";

function Seaded() {
  const [keel, muudaKeel] = useState(localStorage.getItem("keel") || "ee");

  // 17.nda teeme siin
  // const uuendaKeelEE = () => {
  //   muudaKeel("ee");
  //   localStorage.setItem("keel", "ee");
  // }

  // const uuendaKeelEN = () => {
  //   muudaKeel("en");
  //   localStorage.setItem("keel", "en");
  // }

  // const uuendaKeelRU = () => {
  //   muudaKeel("ru");
  //   localStorage.setItem("keel", "ru");
  // }

  const uuendaKeel = (uusKeel) => {
    muudaKeel(uusKeel);
    localStorage.setItem("keel", uusKeel);
  }

  // const/let [adasd,]      const tooted =        let tootedLS =
  // const funktsioon = (tekib_uus_muutuja) => {}
  // .map( element =>  )

  return ( 
    <div>
      <button onClick={() => uuendaKeel("ee")}>EE</button>
      <button onClick={() => uuendaKeel("en")}>EN</button>
      <button onClick={() => uuendaKeel("ru")}>RU</button>
      { keel === "ee" && <div>Veebilehe keel on eesti</div>}
      { keel === "en" && <div>Veebilehe keel on inglise</div>}
      { keel === "ru" && <div>Veebilehe keel on vene</div>}
    </div> );
}

export default Seaded;