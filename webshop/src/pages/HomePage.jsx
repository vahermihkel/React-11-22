import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import SortButtons from "../components/home/SortButtons";
// import productsFromFile from "../data/products.json";
import config from "../data/config.json";
import { ToastContainer } from 'react-toastify';
import Product from "../components/home/Product";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const dbUrl = "https://react-mihkel-webshop-12-2022-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  // uef
  useEffect(() => {
    setLoading(true);
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
        setLoading(false);
      });
  }, []);


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
  const categories = [...new Set(dbProducts.map(element => element.category))];

  if (isLoading === true) {
    return <Spinner />
  }

  return (
    <div>
      <ToastContainer />

      <SortButtons 
        products={products} 
        setProducts={setProducts} />

      <div>{products.length} tk</div>
      {categories.map(element => 
        <button className="active" key={element} onClick={() => filterByCategory(element)}>
          {element}
        </button> )}
      {/* <button onClick={() => filterByCategory("memory bank")}>memory bank</button>
      <button onClick={() => filterByCategory("usb drive")}>usb drive</button> */}
      {products.map(element => 
          <Product key={element.id} element={element} />
        )}
    </div>
  )
}

export default HomePage