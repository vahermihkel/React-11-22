import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const {i} = useParams();   // localhost:3000/muuda/:i
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[i];
  const nimiRef = useRef();
  const hindRef = useRef();
  const piltRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();

  const uuendaToode = () => {
    const uuenenudToode = {
      "nimi": nimiRef.current.value,
      "hind": Number(hindRef.current.value),
      "pilt": piltRef.current.value,
      "aktiivne": aktiivneRef.current.checked
    }
    tooted[i] = uuenenudToode;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    // navigeeri URL-le "/halda-tooteid"
    navigate("/halda-tooted");
  }

  return ( 
  <div>
      {leitudToode !== undefined && 
        <div>
          <label>Toote nimi</label> <br />
          <input ref={nimiRef} defaultValue={leitudToode.nimi} type="text" /> <br />
          <label>Toote hind</label> <br />
          <input ref={hindRef} defaultValue={leitudToode.hind} type="number" /> <br />
          <label>Toote pilt</label> <br />
          <input ref={piltRef} defaultValue={leitudToode.pilt} type="text" /> <br />
          <label>Toote aktiivne</label> <br />
          <input ref={aktiivneRef} defaultChecked={leitudToode.aktiivne} type="checkbox" /> <br />
          <button onClick={uuendaToode}>Muuda</button>
        </div>}
      {leitudToode === undefined && <div>Toodet ei leitud</div>}
  </div> );
}

export default MuudaToode;