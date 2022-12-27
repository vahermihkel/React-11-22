import productsFromFile from "../data/products.json";

function HomePage() {

  const addToCart = (productClicked) => {}

  const sortAZ = () => {
    // useState
    // productsFromFile / products    .map ees   võib anomaaliaid tekitada
  }

  const filterByCategory = (categoryClicked) => {
    // alguses tehke ise nupud (nagu tegime)
    // hiljem võtke toodete küljest dünaamiliselt kõik kategooriad ja .map abil kuvage
    //      kategooriad
    // testimiseks: lisage uus toode, uue kategooriaga ja see nupp KOHESELT ilmub ka avalehele
    //              millega saab filtreerida
  }

  return (
    <div>
      <button onClick={sortAZ}>Sort A-Z</button>
      <button>Sort Z-A</button>
      <button>Sort price asc</button>
      <button>Sort price desc</button>
      <div>{productsFromFile.length} tk</div>
      <button onClick={() => filterByCategory("memory bank")}>memory bank</button>
      <button>usb drive</button>
      {productsFromFile.map(element => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          {/* <div>{element.id}</div> */}
          <div>{element.name}</div>
          <div>{element.price}</div>
          {/* <div>{element.category}</div>
          <div>{element.description}</div>
          <div>{element.active}</div> */}
          <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
        </div>)}
    </div>
  )
}

export default HomePage