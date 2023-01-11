import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import poedFailist from "../poed.json";

function Poed() {
  const [legs, setLegs] = useState([]);

  useEffect(() => {
    fetch("https://secondodyssey-4f2e8-default-rtdb.firebaseio.com/flights.json")
      .then(res => res.json())
      .then(json => setLegs(json.legs))
  }, []);

  return ( 
    <div>
      {legs.map(element => 
        <div>{element.providers.map(element => <div>{element.company.name}</div> 
        )}
      </div> )}
    </div> );
}

export default Poed;