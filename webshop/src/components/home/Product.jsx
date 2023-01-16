import { useContext } from 'react';
import { toast } from 'react-toastify';
import CartSumContext from '../../store/CartSumContext';

function Product(props) {
  const cartSumCtx = useContext(CartSumContext);
 
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

    let cartSum = 0;
    cartLS.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    cartSumCtx.setCartSum(cartSum.toFixed(2));

    cartLS = JSON.stringify(cartLS);
    localStorage.setItem("cart", cartLS);
    toast.success("Toode ostukorvi lisatud!", {
      "position": "bottom-right",
      "theme": "dark"
    });
  }

  return (
    <div>
      <img src={props.element.image} alt="" />
      {/* <div>{element.id}</div> */}
      <div>{props.element.name}</div>
      <div>{props.element.price}</div>
      {/* <div>{element.category}</div>
      <div>{element.description}</div>
      <div>{element.active}</div> */}
      <button onClick={() => addToCart(props.element)}>Lisa ostukorvi</button>
    </div>
  )
}

export default Product