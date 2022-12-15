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
      <div key={index}>
        {element}
        <button onClick={() => kustuta(index)}>x</button>
        <Link to={"/muuda/" + index}>
          <button>Muuda</button>
        </Link>
      </div>)}
  </div> );
}

export default HaldaTooted;