import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const {i} = useParams();   // localhost:3000/muuda/:i
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[i];
  const nimiRef = useRef();
  const navigate = useNavigate();

  const uuendaToode = () => {
    tooted[i] = nimiRef.current.value;
    localStorage.setItem("tooted", JSON.stringify(tooted));
    // navigeeri URL-le "/halda-tooteid"
    navigate("/halda-tooted");
  }

  return ( 
  <div>
      {leitudToode !== undefined && 
        <div>
          <label>Toote nimi</label> <br />
          <input ref={nimiRef} defaultValue={leitudToode} type="text" /> <br />
          <button onClick={uuendaToode}>Muuda</button>
        </div>}
      {leitudToode === undefined && <div>Toodet ei leitud</div>}
  </div> );
}

export default MuudaToode;