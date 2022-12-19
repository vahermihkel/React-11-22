import { useParams } from "react-router-dom"

const YksikToode = () => {
  const {index} = useParams(); // localhost:3000/toode/:index
  // 1. võtan URL-st järjekorranumbri
  // 2. võtma kõik tooted
  // 3. otsima järjekorranumbri alusel toote üles
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const leitudToode = tooted[index];
  // "Tesla" = ["BMW", "Nobe", "Tesla"][2];

  return (
    <div>
      {/* Uncaught Error: Objects are not valid as a React child (found: object with keys {nimi, hind, pilt, aktiivne}) */}
      {leitudToode !== undefined && 
        <div>
          <img src={leitudToode.pilt} alt="" />
          <div>{leitudToode.nimi}</div>
          <div>{leitudToode.hind}</div>
          <div>{leitudToode.aktiivne + 0}</div>
        </div>}
      {leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div>
  )
}

export default YksikToode