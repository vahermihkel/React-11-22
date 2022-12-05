
function Tooted() {
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

  return ( 
    <div>
      {tooted.map(element => <div>{element}</div>)}
    </div> );
}

export default Tooted;