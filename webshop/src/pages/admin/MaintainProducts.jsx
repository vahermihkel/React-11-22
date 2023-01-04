import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
//import productsFromFile from "../../data/products.json"; 
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const searchedRef = useRef();
  const [dbProducts, setDbProducts] = useState([]);

  // uef
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice());
        setDbProducts(json.slice());
      });
  }, []);

  // asb ---   [{1},{2},{3}]
  const remove = (productClicked) => {

    const i = products.findIndex(element => element.id === productClicked.id)
    products.splice(i,1);

    const index = dbProducts.findIndex(element => element.id === productClicked.id)
    dbProducts.splice(index,1);

    fetch(config.productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => {
        setProducts(products.slice());
        toast.error("Toode kustutatud!", {
          "position": "bottom-right",
          "theme": "dark"
        });
      })
  }

  // otsing
  const searchProducts = () => {
    const result = dbProducts.filter(element => element.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()));
    setProducts(result);
  }

  return (
    <div>
      <ToastContainer />
      <input ref={searchedRef} onChange={searchProducts} type="text" />
      <div>{products.length} tk</div>
      {products.map((element, index) => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.id}</div>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <div>{element.category}</div>
          <div>{element.description}</div>
          <div>{element.active}</div>
          <button onClick={() => remove(element)}>Kustuta</button> 
          <Link to={"/admin/edit-product/" + element.id}>
            <button>Muuda</button> 
          </Link>
        </div>)}
    </div>
  )
}

export default MaintainProducts