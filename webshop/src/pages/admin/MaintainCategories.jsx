import { useEffect, useRef, useState } from "react";
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from "react-bootstrap";

function MaintainCategories() {
  const [categories, setCategories] = useState([]);
  const nameRef = useRef();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(config.categoriesDbUrl)
      .then(res => res.json())
      .then(json => {
        setCategories(json || []);
        setLoading(false);
      });
  }, []);

  const add = (event) => {
    if (event.type === "click" || event.key === "Enter") {
      const newCategory = {
      "name": nameRef.current.value
      }
      categories.push(newCategory);
      fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)})
        .then(() => {
          nameRef.current.value = "";
          setCategories(categories.slice());
          toast.success("Kategooria lisatud!", {
            "position": "bottom-right",
            "theme": "dark"
          });
        })
    }
  }

  const remove = (index) => {

    categories.splice(index,1);

    fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)})
      .then(() => {
        setCategories(categories.slice());
        toast.error("Kategooria kustutatud!", {
          "position": "bottom-right",
          "theme": "dark"
        });
      })
  }

  if (isLoading === true) {
    return <Spinner />
  }

  return (
    <div>
      <ToastContainer />
      <label>Kategooria nimi</label>
      <input onKeyUp={add} ref={nameRef} type="text" />
      <button onClick={add}>Lisa</button>
      {categories.map((element, index) => 
        <div key={index}>
          {element.name}
          <button onClick={() => remove(index)}>x</button>
        </div>)}
    </div>
  )
}

export default MaintainCategories