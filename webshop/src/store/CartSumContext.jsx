import { createContext, useState } from "react";

const CartSumContext = createContext(null);

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());

  // const calculateCartSum = () => {}

  function calculateCartSum() {
    let cartLS = localStorage.getItem("cart");
    cartLS = JSON.parse(cartLS) || [];
    let cartSum = 0;
    cartLS.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  return (
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  )
} 

export default CartSumContext;