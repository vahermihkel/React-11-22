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
  const [categories, setCategories] = useState([]);

  // uef
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        // setProducts(json);
        setDbProducts(json);
      });

    fetch(config.categoriesDbUrl)
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
      });
  }, []);

  const add = () => {
    if (idRef.current.value === "") {
      toast.error("Pead lisama ID!", {
        "position": "bottom-right",
        "theme": "dark"
      });
      return; // ei lase minna sellel funktsioonil edasi
    }
    if (nameRef.current.value === "") {
      toast.error("Pead lisama nime!", {
        "position": "bottom-right",
        "theme": "dark"
      });
      return; // ei lase minna sellel funktsioonil edasi
    }
    if (imageRef.current.value === "") {
      toast.error("Pead lisama pildi!", {
        "position": "bottom-right",
        "theme": "dark"
      });
      return; // ei lase minna sellel funktsioonil edasi
    }
    if (categoryRef.current.value === "DEFAULT") {
      toast.error("Pead lisama kategooria!", {
        "position": "bottom-right",
        "theme": "dark"
      });
      return; // ei lase minna sellel funktsioonil edasi
    }
    
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
      {/* <input ref={categoryRef} type="text" /><br /> */}
      <select ref={categoryRef} defaultValue={'DEFAULT'}>
        <option disabled value="DEFAULT">Vali kategooria</option>
        {/* <option>memory bank</option>
        <option>usb stick</option> */}
        {categories.map(element => <option key={element.name}>{element.name}</option> )}
      </select> <br />
      <label>Uue toote kirjeldus</label><br />
      <input ref={descriptionRef} type="text" /><br />
      <label htmlFor="active">Uue toote aktiivsus</label><br />
      <input id="active" ref={activeRef} type="checkbox" /><br />
                        {/* !isUnique */}
      <button disabled={isUnique === false} onClick={add}>Sisesta</button>
    </div>
  )
}

export default AddProduct