import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"
import config from "../../data/config.json";

function EditProduct() {
  const [dbProducts, setDbProducts] = useState([]);
  const { id } = useParams();
  const productFound = dbProducts.find(element => element.id === Number(id));
  const index = dbProducts.indexOf(productFound);
  // const index2 = productsFromFile.findIndex(element => element.id === Number(id));
  // const productFound2 = productsFromFile[index2];

  const [isUnique, setUnique] = useState(true);
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  // uef
  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        // setProducts(json);
        setDbProducts(json);
      });
  }, []);

  const changeProduct = () => {
    const updatedProduct = {
      "id": Number(idRef.current.value),
      "name": nameRef.current.value,
      "price": Number(priceRef.current.value),
      "image": imageRef.current.value,
      "category": categoryRef.current.value,
      "description": descriptionRef.current.value,
      "active": activeRef.current.checked,
    }
    dbProducts[index] = updatedProduct;
    // productsFromFile.push(updatedProduct);
    // idRef.current.value = ""; 7x

    // KODUS
  }
  
  const checkIdUniqueness = () => {
    if (idRef.current.value === id) {
      return; // ära mine siit funktsioonist edasi
    }
    
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
      {isUnique === false && <div>Sellise ID-ga toode on juba olemas</div>}
      {productFound !== undefined && 
        <div>
          <label>ID</label> <br />  
          <input ref={idRef} onChange={checkIdUniqueness} defaultValue={productFound.id} type="number" /> <br />
          <label>Name</label> <br />  
          <input ref={nameRef} defaultValue={productFound.name} type="text" /> <br />
          <label>Price</label> <br />  
          <input ref={priceRef} defaultValue={productFound.price} type="number" /> <br />
          <label>Image</label> <br />  
          <input ref={imageRef} defaultValue={productFound.image} type="text" /> <br />
          <label>Category</label> <br />  
          <input ref={categoryRef} defaultValue={productFound.category} type="text" /> <br />
          <label>Description</label> <br />  
          <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
          <label>Active</label> <br />  
          <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
          <button onClick={changeProduct} disabled={isUnique === false}>Change</button>
        </div>}
      {productFound === undefined && <div>Toodet ei leitud</div>}
    </div>
  )
}

export default EditProduct

// SingleProduct
// 1. App.js failis URL-s muutuja võimekus
// 2. Pean tegema sattumise võimekuse <Link to=""> abil
// 3. Pean muutuja kätte saama useParams() abil (+ import)
// 4. Pean kõik tooted kätte saama
// 5. Otsin üles õige toote .find() abil
// 6. ID toote küljes on numbriline aga URLs on kõik muutuja sõnalised
//       teisendame sõna numbriks
// 7. Kuvame HTML-s - 7x
// 8. Kontrollid, et kui ei leia

// AddProduct
// 9. Teeme 7x useRef (import ka)
// 10. Teeme 7x label + input ja lisame ref-d input sisse
// 11. Teeme nupu ja sellega seonduva funktsiooni
// 12. Seon kokku kõik ref-d üheks objektiks
// 13. Kui on number, siis HTMLs type="number" ja checkboxi puhul checkbox
// 14. Kokku sidudes numbri ette Number() ja checkboxi puhul .value asemel .checked

// 15. Pushin productsFromFile sisse (refreshiga kaob)

// 15. Paneme kõigile defaultValue-d
// 16. Peame üles otsima järjekorranumbri
// 17. Muudame productsFromFile seest järjekorranumbri alusel toote ära