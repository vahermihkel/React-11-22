import productsFromFile from "../data/products.json";

function HomePage() {

  const addToCart = (productClicked) => {}

  return (
    <div>
      {productsFromFile.map(element => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.id}</div>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <div>{element.category}</div>
          <div>{element.description}</div>
          <div>{element.active}</div>
          <button onClick={() => addToCart(element)}>Lisa ostukorvi</button>
        </div>)}
    </div>
  )
}

export default HomePage