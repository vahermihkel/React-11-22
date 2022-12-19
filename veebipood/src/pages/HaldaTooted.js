import { useState } from "react";
import { Link } from "react-router-dom";

function HaldaTooted() {
  const [tooted, uuendaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

  const kustuta = (i) => {
    tooted.splice(i,1);
    uuendaTooted(tooted.slice());
    localStorage.setItem("tooted", JSON.stringify(tooted));
  }

  return ( <div>
    {tooted.map((element,index) => 
      <div className={ element.aktiivne === true ? "aktiivne" : "mitteaktiivne" } key={index}>
        <img src={element.pilt} alt="" />
        <div>{element.nimi}</div>
        <div>{element.hind} €</div>
        <div>{element.aktiivne + 0}</div>
        <button onClick={() => kustuta(index)}>x</button>
        <Link to={"/muuda/" + index}>
          <button>Muuda</button>
        </Link>
      </div>)}
  </div> );
}

export default HaldaTooted;