import { useState } from "react";

function Avaleht() {

  const [kogus, muudaKogus] = useState(0); // number algväärtus
  const [sonum, muudaSonum] = useState(""); // string algväärtus - sõna
  const [laigitud, muudaLaigitud] = useState(false); // boolean algväärtus - kahendväärtus

  //kogus = 3;

  function nulli() {
    muudaKogus(0);
    muudaSonum("Panid tagasi nulli");
  }

  function vahenda() {
    muudaKogus(kogus - 1);
    muudaSonum("Vähendasid kogust");
  }

  function suurenda() {
    // kogus = 10;
    //console.log(kogus); // brauseri konsool, kuhu saan välja kuvada sõnumeid
    muudaKogus(kogus + 1);
    muudaSonum("Suurendasid kogust");
  }

  return ( 
    <div>
      { laigitud === true && <img onClick={() => muudaLaigitud(false)} src="/laigitud.svg" alt="" /> }
      { laigitud === false && <img onClick={() => muudaLaigitud(true)} src="/mittelaigitud.svg" alt="" /> }

      <div>{sonum}</div>
      { kogus > 0 && <button onClick={nulli}>Nulli tagasi</button>} <br />
      <button disabled={kogus === 0} onClick={vahenda}>-</button>
      <div>{kogus}</div>
      <button onClick={suurenda}>+</button>
    </div> );
}

export default Avaleht;