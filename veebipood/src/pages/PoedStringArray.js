import { useRef } from "react";
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
  const poodRef = useRef(); // pean tegema useRef osas impordi

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
  
  const sorteeriTeiseTaheJ2rgi = () => {
    //meiePoed.sort() // <---- default funktsionaalsus: paneb kõik A-Z järjekorda
    meiePoed.sort((a, b) => a.charAt(1).localeCompare(b.charAt(1))); 
    uuendaPoode(meiePoed.slice()); // .slice() teeb koopia
  }

  // sort, filter, map ---> array funktsioonid ehk kellele ma neid teen peab olema kujul []
  // charAt, endsWith, includes, toLowerCase ---> stringi funktsioonid
  // Lasnamäe:  0-L  ,  1-a   ,  2-s   ,    3-n    ,   4-a 
  // a ja b võrdlus - kui on a enne, siis kasvav, kui b enne, siis kahanev

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

  const filtreeriKellel7T2hte = () => {
    const tulem = meiePoed.filter(pood => pood.length === 7);
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

  const muudaPikkusL6ppu = () => {
    const tulem = meiePoed.map(pood => pood + pood.length);
    uuendaPoode(tulem);
  }

  const tyhjenda = () => {
    // filtreerib kõik välja kuna noole järel on väär
    // const tulem = meiePoed.filter(pood => false); 
    // uuendaPoode(tulem);

    // splice on kustutamiseks, alates mitmendast järjekorranumbrist (0 <- on esimene)
    // meiePoed.splice(0); 
    // uuendaPoode(meiePoed.slice());

    uuendaPoode([]);
  }

      // kui ei algväärtustata, tuleb siia tühjus
      // kui on tühjus, siis kustutatakse ESIMENE, sest tühjus on 0
  const kustuta = (j2rjekorraNumber) => {
    meiePoed.splice(j2rjekorraNumber, 1); // võtab ühe vähemaks
    uuendaPoode(meiePoed.slice()); // uuendab HTMLi
  }

  // const kustutaMustam2e = () => {
  //   meiePoed.splice(0, 1);
  // }

  // const kustutaKristiine = () => {
  //   meiePoed.splice(1, 1);
  // }

  // const kustutaKesklinn = () => {
  //   meiePoed.splice(2, 1);
  // }

  // const kustutaLasnam2e = () => {
  //   meiePoed.splice(3, 1);
  // }

  const lisa = () => {
    // meiePoed.push(document.getElementById("poodInput").value);
    meiePoed.push(poodRef.current.value);
    uuendaPoode(meiePoed.slice());
  }

  // document.getElementById <----- käib KÕIK HTML-ld läbi
  // 1. vigade tekkimise oht
  // 2. efektiivsus / kiirus

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
      <button onClick={lisa}>Sisesta uus</button> <br />
      {meiePoed.map( (pood, index) => 
        <div key={index}>
          {index}. {pood} 
          <button onClick={() => kustuta(index)}>x</button>
        </div> )}
      <div>------------------------------</div>
    {/* ["Mustamäe", "Kristiine", "Kesklinn"].map((element, index) =>)
      ("Mustamäe", 0) => <div>Mustamäe</div>
      ("Kristiine", 1) => <div>Kristiine</div>
      ("Kesklinn", 2)=> <div>Kesklinn</div>
       */}
      <div>Mustamäe</div>
      <div>Kristiine</div>
      <div>Kesklinn</div>
      <div>Lasnamäe</div>
      <div>Põhja-Tallinn</div>
      <div>Õismäe</div>
      <div>Kakumäe</div>
      <div>------------------------</div>
      {["BMW", "Nobe", "Tesla"].map( auto => <div key={auto}>{auto}</div> )}
      <div>BMW</div>
      <div>Nobe</div>
      <div>Tesla</div>
    </div> );
}

// JS: 1.kui tahetakse läbi vormi juurde lisada
// 2.tahetakse neid andmebaasis hoida
// 3. tahan järjekorda muuta

export default Poed;

// Väikekaupmehele/endale 2500 eur --> 2-3päeva Wordpress / ajakulu 2 nädalat
// FB Grupp "Vabakutselised arendajad ja disainerid"

// Väike custom-made --> 10 000 - 50 000  React / Backend Nodejs Expressjs Nextjs
// 6kuud

// Suur custom-made ---> 100 000+   React / Backend Java 
// alates 1a     3.8miljonit   5 aastat    63 000    

// 1. hange oli kirjutada lahti riigi soovid -> Nortal
// 2. hange oli Nortali lahtikirjutatud asjade peale tegemine

// Waterfall    maksad ühe summa ja tehakse selle eest valmis
// Agiilne    maksad kõik tunnid kinni

// Scrum master / Tiimijuht / Analüütik
// Panevad paika tööjärjekorra, räägivad klientidega läbi jne