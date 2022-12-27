import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import productsFromFile from "../../data/products.json"; 

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);
  const searchedRef = useRef();

  const remove = (i) => {
    products.splice(i,1);
    setProducts(products.slice());
  }

  // otsing
  const searchProducts = () => {
    const result = productsFromFile.filter(element => element.name.toLowerCase().includes(searchedRef.current.value.toLowerCase()));
    setProducts(result);
  }

  return (
    <div>
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
          <button onClick={() => remove(index)}>Kustuta</button> 
          <Link to={"/admin/edit-product/" + element.id}>
            <button>Muuda</button> 
          </Link>
        </div>)}
    </div>
  )
}

export default MaintainProducts