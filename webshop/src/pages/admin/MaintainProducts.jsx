import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
//import productsFromFile from "../../data/products.json"; 
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";
import styles from "../../css/MaintainProducts.module.css";

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const searchedRef = useRef();
  const [dbProducts, setDbProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  // uef
  useEffect(() => {
    setLoading(true);
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice());
        setDbProducts(json.slice());
        setLoading(false);
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

  const changeProductActive = (productClicked) => {
    const i = products.findIndex(element => element.id === productClicked.id);
    products[i].active = !products[i].active;
    fetch(config.productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => {
        setProducts(products.slice());
      })
  }

  if (isLoading === true) {
    return <Spinner />
  }

  return (
    <div>
      <ToastContainer />
      <input ref={searchedRef} onChange={searchProducts} type="text" />
      <div>{products.length} tk</div>
      {products.map((element, index) => 
        <div key={element.id} className={element.active === true ? styles.active : styles.inactive}>
          <div onClick={() => changeProductActive(element)}>
            <img src={element.image} alt="" />
            <div>{element.id}</div>
            <div>{element.name}</div>
            <div>{element.price}</div>
            <div>{element.category}</div>
            <div>{element.description}</div>
            <div>{element.active}</div>
          </div>
          <button onClick={() => remove(element)}>Kustuta</button> 
          <Link to={"/admin/edit-product/" + element.id}>
            <button>Muuda</button> 
          </Link>
        </div>)}
    </div>
  )
}

export default MaintainProducts