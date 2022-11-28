import { useRef, useState } from "react";

// tumesinine - tähistus/liik   function, const, let, HTMLs div, label, input
// sinine - muutuja mis on loodud kõige üleval
// helesinine - mingi omadus sellest muutujast
// kollane - funktsioon
// lilla - tagastis

function LisaToode() {
  const [sonum, muudaSonum] = useState("Lisa uus toode!");
  const nimiViide = useRef();

  function lisa() {
    if (nimiViide.current.value === "") {
      muudaSonum("Tühja nimega toodet ei saa lisada!");
    } else {
      muudaSonum("Toode lisatud " + nimiViide.current.value);
    }

    // nimiViide.current.value === "" ? 
    //   muudaSonum("Tühja nimega toodet ei saa lisada!") : 
    //   muudaSonum("Toode lisatud " + nimiViide.current.value);
  }

  return ( 
    <div>
      <div>{sonum}</div>
      <label>Uue toote nimi</label> <br />
      <input ref={nimiViide} type="text" /> <br />
      <button onClick={lisa}>Sisesta</button> <br />
    </div> );
}

export default LisaToode;