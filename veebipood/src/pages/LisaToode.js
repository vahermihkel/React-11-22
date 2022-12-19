import { useRef, useState } from "react";

// tumesinine - tähistus/liik   function, const, let, HTMLs div, label, input
// sinine - muutuja mis on loodud kõige üleval
// helesinine - mingi omadus sellest muutujast
// kollane - funktsioon
// lilla - tagastis

function LisaToode() {
  const [sonum, muudaSonum] = useState("Lisa uus toode!");
  const nimiViide = useRef();
  const piltViide = useRef();
  const hindViide = useRef();
  const aktiivneViide = useRef();

  function lisa() {
    if (nimiViide.current.value === "") {
      muudaSonum("Tühja nimega toodet ei saa lisada!");
    } else {
      muudaSonum("Toode lisatud " + nimiViide.current.value);

      let tootedLS = localStorage.getItem("tooted");
      tootedLS = JSON.parse(tootedLS) || [];
      const uusToode = {
        "nimi": nimiViide.current.value,
        "hind": Number(hindViide.current.value),
        "pilt": piltViide.current.value,
        "aktiivne": aktiivneViide.current.checked,
      }
      tootedLS.push(uusToode);
      tootedLS = JSON.stringify(tootedLS);
      localStorage.setItem("tooted", tootedLS);

      nimiViide.current.value = "";
      hindViide.current.value = "";
      piltViide.current.value = "";
      aktiivneViide.current.checked = false;

      // eksisteerivad JS-s: localStorage+funktsioonid, JSON+funktsioonid, console.log
      // let ja const abil teen enda muutujaid (+funktsioone)
      // kõik Reacti asjad tuleb importida
      

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
      <label>Uue toote pilt</label> <br />
      <input ref={piltViide} type="text" /> <br />
      <label>Uue toote hind</label> <br />
      <input ref={hindViide} type="number" /> <br />
      <label>Uue toote aktiivsus</label> <br />
      <input ref={aktiivneViide} type="checkbox" /> <br />
      <button onClick={lisa}>Sisesta</button> <br />
    </div> );
}

export default LisaToode;