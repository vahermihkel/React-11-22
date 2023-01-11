import { useEffect, useState } from "react"

function ParcelMachines() {
  const [parcelMachines, setParcelMachines] = useState([]);
  // useState() sulgude sees on enne API päringu valmis saamist olev väärtus

  // useEffect käib käsikäes fetchiga, kus kasutatakse useState funktsiooniga
  // kui tullakse lehele ja tehakse kohe lehele tulles API päring
  // mitu korda seda lõiku tehakse ja tühja array'ga rohkem ei tehta kui 1x
  useEffect(() => {
    fetch("https://www.omniva.ee/locations.json")
      .then(res => res.json())
      .then(json => setParcelMachines(json));
  }, []);  

  return (
    <select>
      {parcelMachines
        .filter(element => element.A0_NAME === "EE")
        .filter(element => element.NAME !== "1. eelistus minu.omniva.ee-s")
        .map(element => <option key={element.NAME}>{element.NAME}</option>)}
    </select>
  )
}

export default ParcelMachines