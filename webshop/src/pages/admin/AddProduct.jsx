import { useEffect, useRef, useState } from 'react'
// import productsFromFile from "../../data/products.json";
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
  const [isUnique, setUnique] = useState(true);

  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  const [dbProducts, setDbProducts] = useState([]);

  // uef
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        // setProducts(json);
        setDbProducts(json);
      });
  }, []);

  const add = () => {
    const newProduct = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "image": imageRef.current.value,
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "active": activeRef.current.checked,
    }
    dbProducts.push(newProduct);

    fetch(config.productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
      .then(() => {
        idRef.current.value = "";
        nameRef.current.value = "";
        priceRef.current.value = "";
        imageRef.current.value = "";
        categoryRef.current.value = "";
        descriptionRef.current.value = "";
        activeRef.current.checked = false;
        toast.success("Toode lisatud!", {
          "position": "bottom-right",
          "theme": "dark"
        });
      })
  }

  const checkIdUniqueness = () => {
    const product = dbProducts.find(element => element.id === Number(idRef.current.value));
    if (product === undefined) {
      // EI OLE SELLISE ID-ga TOODET
      setUnique(true);
    } else {
      // ON SELLISE ID-ga TOODE
      setUnique(false);
    }
  }

  return (
    <div>
      <ToastContainer />
      {isUnique === false && <div>Sellise ID-ga toode on juba olemas</div>}
      <label>Uue toote ID</label><br />
      <input ref={idRef} onChange={checkIdUniqueness} type="number" /><br />
      <label>Uue toote nimi</label><br />
      <input ref={nameRef} type="text" /><br />
      <label>Uue toote pilt</label><br />
      <input ref={imageRef} type="text" /><br />
      <label>Uue toote hind</label><br />
      <input ref={priceRef} type="number" /><br />
      <label>Uue toote kategooria</label><br />
      <input ref={categoryRef} type="text" /><br />
      <label>Uue toote kirjeldus</label><br />
      <input ref={descriptionRef} type="text" /><br />
      <label>Uue toote aktiivine</label><br />
      <input ref={activeRef} type="checkbox" /><br />
                        {/* !isUnique */}
      <button disabled={isUnique === false} onClick={add}>Sisesta</button>
    </div>
  )
}

export default AddProduct