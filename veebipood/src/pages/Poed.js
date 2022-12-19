import { useRef } from "react";
import { useState } from "react";
import poedFailist from "../poed.json";

function Poed() {
  const [meiePoed, uuendaPoode] = useState(poedFailist.slice());
  const poodRef = useRef(); 
  const aegRef = useRef();

  const tagasi = () => {
    uuendaPoode(poedFailist.slice());
  }

  const sorteeriAZ = () => {
                          // "Mustamäe".localeCompare("Kristiine")
    meiePoed.sort((a, b) => a.nimi.localeCompare(b.nimi));
    uuendaPoode(meiePoed.slice());
  }

  const sorteeriZA = () => {
                     //enne: "Mustamäe".localeCompare("Kristiine")
                     //nüüd: 
//{"nimi": "Mustamäe", "aeg": "9-22"}.localeCompare({"nimi": "Kristiine", "aeg": "10-22"})
    meiePoed.sort((a, b) => b.nimi.localeCompare(a.nimi));
    uuendaPoode(meiePoed.slice());
  }

  const sorteeriTahed = () => {
    meiePoed.sort((a, b) => a.nimi.length - b.nimi.length);
    uuendaPoode(meiePoed.slice());
  }

  const sorteeriTahedKah = () => {
    meiePoed.sort((a, b) => b.nimi.length - a.nimi.length); 
    uuendaPoode(meiePoed.slice());
  }
  
  const sorteeriTeiseTaheJ2rgi = () => {
    meiePoed.sort((a, b) => a.nimi.charAt(1).localeCompare(b.nimi.charAt(1))); 
    uuendaPoode(meiePoed.slice()); // .slice() teeb koopia
  }

  const filtreeri = () => {
    const tulem = meiePoed.filter(pood => pood.nimi.endsWith("mäe"));
    uuendaPoode(tulem);
  }

  const filtreeriLinn = () => {
    const tulem = meiePoed.filter(pood => pood.nimi.includes("linn"));
    uuendaPoode(tulem);
  }

  const filtreeri3sS = () => {
    const tulem = meiePoed.filter(pood => pood.nimi.charAt(2) === "s");
    uuendaPoode(tulem);
  }

  const filtreeriKellel7T2hte = () => {
    const tulem = meiePoed.filter(pood => pood.nimi.length === 7);
    uuendaPoode(tulem);
  }

  const muudaVaikseks = () => {
    const tulem = meiePoed.map(pood => { return {"nimi": pood.nimi.toLowerCase(), "aeg": pood.aeg} });
    uuendaPoode(tulem);
  }

  const muudaSuureks = () => {
    const tulem = meiePoed.map(pood => { return {"nimi": pood.nimi.toUpperCase(), "aeg": pood.aeg} });
    uuendaPoode(tulem);
  }

  const muudaKriipsudEtte = () => {
    const tulem = meiePoed.map(pood => { return {"nimi": "--" + pood.nimi, "aeg": pood.aeg} });
    uuendaPoode(tulem);
  }

  const muudaPikkusL6ppu = () => {
    const tulem = meiePoed.map(pood => { return {"nimi": pood.nimi + pood.nimi.length, "aeg": pood.aeg} });
    uuendaPoode(tulem);
  }

  const tyhjenda = () => {
    uuendaPoode([]);
  }

  const kustuta = (j2rjekorraNumber) => {
    meiePoed.splice(j2rjekorraNumber, 1); 
    uuendaPoode(meiePoed.slice()); 
  }

  const lisa = () => {
    meiePoed.push({"nimi": poodRef.current.value, "aeg": aegRef.current.value});
    uuendaPoode(meiePoed.slice());
  }

  return ( 
    <div>
      <div>
        <button onClick={tagasi}>Pane tagasi algväärtus</button>
        <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
        <button onClick={sorteeriZA}>Sorteeri Z-A</button>
        <button onClick={sorteeriTahed}>Sorteeri tähemärkide kasvavas järjekorras</button>
        <button onClick={sorteeriTahedKah}>Sorteeri tähemärkide kahanevas järjekorras</button>
        <button onClick={sorteeriTeiseTaheJ2rgi}>Sorteeri teise tähe järgi</button>
        <button onClick={filtreeri}>Jäta alles 'mäe'-ga lõppevad</button>
        <button onClick={filtreeriLinn}>Jäta alles kellel 'linn' sees</button>
        <button onClick={filtreeri3sS}>Jäta alles kellel 3-s täht 's'</button>
        <button onClick={filtreeriKellel7T2hte}>Jäta alles kellel 3-s täht 's'</button>
        <button onClick={muudaVaikseks}>Muuda kõikidel tähed väikseks</button>
        <button onClick={muudaSuureks}>Muuda kõikidel tähed suureks</button>
        <button onClick={muudaKriipsudEtte}>Muuda kõikidel kriipsud ette</button>
        <button onClick={muudaPikkusL6ppu}>Muuda kõikidel kriipsud ette</button>
        <button onClick={tyhjenda}>Tühjenda</button>
      </div>
      <div>Poode kokku: {meiePoed.length}</div>
      <label>Uus pood</label> <br />
      <input ref={poodRef} type="text" /> <br />
      <label>Uue poe lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text" /> <br />
      <button onClick={lisa}>Sisesta uus</button> <br />
      {meiePoed.map( (pood, index) => 
        <div key={index}>
          {index}.  {pood.nimi}  {pood.aeg}
          {/* {"Mustamäe"} */}
          {/* {{"nimi": "Mustamäe", "aeg": "9-22"}.nimi} */}
          <button onClick={() => kustuta(index)}>x</button>
        </div> )}
    </div> );
}

export default Poed;