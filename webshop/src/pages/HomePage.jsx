import { useEffect, useState } from "react";
// import productsFromFile from "../data/products.json";
import config from "../data/config.json";


function HomePage() {
  const [products, setProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  // const dbUrl = "https://react-mihkel-webshop-12-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
      });
  }, []);

    // [{id, name, price}, {id, name, price}, {id, name, price}, {id, name, price}]
  // [{product: {id, name, price}, quantity: 5}, {product: {id, name, price}, quantity: 5}, {product: {id, name, price}, quantity: 1}]
  const addToCart = (productClicked) => {
    let cartLS = localStorage.getItem("cart");
    cartLS = JSON.parse(cartLS) || [];
    // kui järjekorranumber on -1, siis teda pole ostukorvis
    // kui järjekorranumber on 0 või suurem, siis ta on
    const index = cartLS.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      cartLS[index].quantity = cartLS[index].quantity + 1;
    } else {
      // kui ei ole varasemalt ostukorvis
      cartLS.push({"product": productClicked, "quantity": 1});
    }
    cartLS = JSON.stringify(cartLS);
    localStorage.setItem("cart", cartLS);
  }

  const sortAZ = () => {
    products.sort((a,b) => a.name.localeCompare(b.name));
    setProducts(products.slice());
  }

  const sortZA = () => {
    products.sort((a,b) => b.name.localeCompare(a.name));
    setProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b) => a.price - b.price);
    setProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b) => b.price - a.price);
    setProducts(products.slice());
    // useState
    // productsFromFile / products    .map ees   võib anomaaliaid tekitada
  }

  const filterByCategory = (categoryClicked) => {
    const result = dbProducts.filter(element => element.category === categoryClicked);
    setProducts(result);
    // alguses tehke ise nupud (nagu tegime)
    // hiljem võtke toodete küljest dünaamiliselt kõik kategooriad ja .map abil kuvage
    //      kategooriad
    // testimiseks: lisage uus toode, uue kategooriaga ja see nupp KOHESELT ilmub ka avalehele
    //              millega saab filtreerida
  }
          // võtke toodete küljest kõik kategooriad ja tehke nad hiljem unikaalseks
  const categories = ["memory bank","usb drive"];

  return (
    <div>
      <button onClick={sortAZ}>Sort A-Z</button>
      <button onClick={sortZA}>Sort Z-A</button>
      <button onClick={sortPriceAsc}>Sort price asc</button>
      <button onClick={sortPriceDesc}>Sort price desc</button>
      <div>{products.length} tk</div>
      {categories.map(element => 
        <button key={element} onClick={() => filterByCategory(element)}>
          {element}
        </button> )}
      {/* <button onClick={() => filterByCategory("memory bank")}>memory bank</button>
      <button onClick={() => filterByCategory("usb drive")}>usb drive</button> */}
      {products.map(element => 
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