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

      let tootedLS = localStorage.getItem("tooted");
      tootedLS = JSON.parse(tootedLS) || [];
      tootedLS.push(nimiViide.current.value);
      tootedLS = JSON.stringify(tootedLS);
      localStorage.setItem("tooted", tootedLS);


      // const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
      // tooted.push(nimiViide.current.value);
      // localStorage.setItem("tooted", JSON.stringify(tooted));

      // 1. võta kõik varasemad väärtused selle võtme alusel
      // 2. võta jutumärgid maha
      // 3. lisa üks juurde varasematele väärtustele
      // 4. pane jutumärgid tagasi peale
      // 5. asenda ära kõik mis on localStorage-s selle võtme taga uue väärtusega

      // localStorage.pushItem("tooted", nimiViide.current.value);
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