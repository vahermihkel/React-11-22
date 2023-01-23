import '../styles/Intro.css'
const Intro = () => {
  return (
    <div className='page'>
      <div className='inline'>
      <h2>FUNKTSIONAALSED NÕUDED</h2>
      <p>Artikli vaade on lihtne: tee päring ja kuva saadud vastus.</p>
      <p>
        Tabeli vaate puhul soovime näha, kuidas sa Array-dega ringi käia oskad: <br />
        Tabelis tuleb saadud vastus tabeli ridadel välja kuvada, sh tabelile 3-sammuline sorteerimine peale panna (Asc, Desc, Default). <br />
        Tabelile tuleb ka lehejaotus külge panna. Funktsionaalsus peaks olema 1:1 proovitöö lehel oleva lehejaotusega.
      </p>
      <h2>MITTE FUNCTSIONAALSED NÕUDED</h2>
      <p>
        * Proovitöö lahendamiseks peab kasutama Vue, React või Angular raamistiku. <br />
        * Proovitöö puhul soovitame vältida väliseid mooduleid (paginator, table sorter, jne). <br />
        * Kujundus ei pea olema sama, mis proovitööl, aga selle järgi tegemine annab lisapunkte. <br />
      </p>
      <h2>API</h2>
      <p className='text-center'>
        <div className='twn_button'>Artikkel</div>
        <div className='twn_button'>Nimekiri</div>
      </p>
      <h2>Materjalid</h2>
      <p className='text-center'>
        <div className='twn_button'>Font</div>
        <div  className='twn_button'>Graafika</div>
      </p>
      </div>
    </div>
  )
}

export default Intro