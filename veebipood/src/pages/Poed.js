import { useState } from "react";
import poedFailist from "../poed.json";

function Poed() {
// array, list, massiiv -> [ , , , , ]
// lõpmatult palju väärtusi sees
// array on elementide kogumik

// [] <-- array algus ja lõpp
// [muutuja, funktsioon] <-- useState ongi kahekohaline array
// {} <-- 1. JavaScriptis tähistab koodiblokki
//         function() {}        if() {} else {}
//        2. HTMLs tähistab JavaScripti {muutuja}     { 2*3===5 && <div></div> }    
//                  {[1,2,3].map(element => <button>{element}</button> )}
//* {} <-- objekti, milles on võti-väärtus paarid
// () <-- funktsioonide tähistus   useState()   map()   function(){}   lisa()
// const () => {}  <-- funktsiooni tähistus
// ===   <-- vasak ja parem pool on võrdsed
// !==   <-- vasak ja parem pool ei ole võrdsed
// !     <-- keerab tagurpidi     !true   --->   false 
// <=    <-- väiksem võrdne 
// ||    <-- kui on vasakul null ehk tühjus, siis võta parempoolne
// &&    <-- näita välja kui vasakpoolne on õige
// ""  ''  <-- jutumärgid, pole vahet kumb      'Sõber ütles mulle: "Tere"  '     "Sõber ütles mulle: 'Tere' "
// =>   <-- nool, mille vasak pool muutub ja iga muudatusega minnakse paremat poolt tegema
// ;    <-- rea lõpetamise tähis, mis pole kohustuslik
// =    <-- väärtuse andmine paremalt vasakule  

  const [meiePoed, uuendaPoode] = useState(poedFailist.slice());

  const tagasi = () => {
    uuendaPoode(poedFailist.slice());
  }

  // function tagasi() {

  // }

  const sorteeriAZ = () => {
    meiePoed.sort(); // sissekirjutatud JavaScripti funktsionaalsus
    // console.log(meiePoed);
    uuendaPoode(meiePoed.slice());
  }

  const sorteeriZA = () => {
    meiePoed.sort((a, b) => b.localeCompare(a));
    uuendaPoode(meiePoed.slice());
  }

  const sorteeriTahed = () => {
    // 1. a: Mustamäe 8   b: Kristiine 8
    // 2. a: Kristiine 8   b: Kesklinn 8
    // 3. a: Lasnamäe 8    b:  Põhja-Tallinn 13
    // 4. a: Põhja-Tallinn 13   b: Õismäe  6
    meiePoed.sort((a, b) => a.length - b.length);   // kui tuleb negatiivne, siis ta jätab järjekorra samaks
    // kui tuleb positiivne -> vaheta järjekord
    uuendaPoode(meiePoed.slice());
  }

  const sorteeriTahedKah = () => {
    //meiePoed.sort((a, b) => -1*(a.length - b.length));  // 8-6   6-8 = -2   8-6=2 -> -2
    meiePoed.sort((a, b) => b.length - a.length); 
    uuendaPoode(meiePoed.slice());
  }

  const filtreeri = () => {
    const tulem = meiePoed.filter(pood => pood.endsWith("mäe"));
    uuendaPoode(tulem);
  }

  const filtreeriLinn = () => {
    const tulem = meiePoed.filter(pood => pood.includes("linn"));
    uuendaPoode(tulem);
  }

  const filtreeri3sS = () => {         // Mustamäe 0-M, 1-u, 2-s    Õismäe  0-Õ, 1-i, 2-s
    // 01234567     012345
    // Mustamäe     Õismäe   
    const tulem = meiePoed.filter(pood => pood.charAt(2) === "s");
    uuendaPoode(tulem);
  }

  const muudaVaikseks = () => {
    const tulem = meiePoed.map(pood => pood.toLowerCase());
    uuendaPoode(tulem);
  }

  const muudaSuureks = () => {
    const tulem = meiePoed.map(pood => pood.toUpperCase());
    uuendaPoode(tulem);
  }

  const muudaKriipsudEtte = () => {
    const tulem = meiePoed.map(pood => "--" + pood);
    uuendaPoode(tulem);
  }

  return ( 
    <div>
      <button onClick={tagasi}>Pane tagasi algväärtus</button>
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriTahed}>Sorteeri tähemärkide kasvavas järjekorras</button>
      <button onClick={sorteeriTahedKah}>Sorteeri tähemärkide kahanevas järjekorras</button>
      <button onClick={filtreeri}>Jäta alles 'mäe'-ga lõppevad</button>
      <button onClick={filtreeriLinn}>Jäta alles kellel 'linn' sees</button>
      <button onClick={filtreeri3sS}>Jäta alles kellel 3-s täht 's'</button>
      <button onClick={muudaVaikseks}>Muuda kõikidel tähed väikseks</button>
      <button onClick={muudaSuureks}>Muuda kõikidel tähed suureks</button>
      <button onClick={muudaKriipsudEtte}>Muuda kõikidel kriipsud ette</button>
      <div>Poode kokku: {meiePoed.length}</div>
      {meiePoed.map( (pood, index) => <div key={index}>{pood}</div> )}
      <div>------------------------------</div>
    {/* ["Mustamäe", "Kristiine", "Kesklinn"].map()
      "Mustamäe" => <div>Mustamäe</div>
      "Kristiine" => <div>Kristiine</div>
      "Kesklinn" => <div>Kesklinn</div>
       */}
      <div>Mustamäe</div>
      <div>Kristiine</div>
      <div>Kesklinn</div>
      <div>Lasnamäe</div>
      <div>Põhja-Tallinn</div>
      <div>Õismäe</div>
      <div>Kakumäe</div>
      <div>------------------------</div>
      {["BMW", "Nobe", "Tesla"].map( auto => <div>{auto}</div> )}
      <div>BMW</div>
      <div>Nobe</div>
      <div>Tesla</div>
    </div> );
}

// JS: 1.kui tahetakse läbi vormi juurde lisada
// 2.tahetakse neid andmebaasis hoida
// 3. tahan järjekorda muuta

export default Poed;