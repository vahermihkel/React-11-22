import { useState } from "react"
import { Link } from "react-router-dom";
import ParcelMachines from "../components/cart/ParcelMachines";
import "../css/Cart.css";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  // võimaldage tühjendada
  const empty = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  }

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    //     cart[index].quantity -= 1;
    //     cart[index].quantity--;
    if (cart[index].quantity === 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1;
    //     cart[index].quantity += 1;
    //     cart[index].quantity++;
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // võimaldage ühte kustutada
  const removeFromCart = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ostukorvi kogusumma
  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity);
    return cartSum.toFixed(2);
  }

  const calculateCartItems = () => {
    let cartItems = 0;
    cart.forEach(element => cartItems = cartItems + element.quantity);
    return cartItems;
  }

  // ostukorvi pikkuse näitamine + dünaamiline väljakuvamine
  // [{id, name, price}, {id, name, price}, {id, name, price}, {id, name, price}]
  // [{product: {id, name, price}, quantity: 3}, {product: {id, name, price}, quantity: 1}]

  const pay = () => {
    const paymentUrl = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": calculateCartSum(),
      "order_reference": Math.random()*999999,
      "nonce": "a9b7f7e7941" + Math.random()*999999 + new Date(),
      "timestamp": new Date(),
      "customer_url": "https://react-mihkel-12-2022.web.app"
      };
    const paymentHeaders = {
      "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
      "Content-Type": "application/json"
    }; // Authorization vaates, lisaks text/plain --> JSON kuju

    fetch(paymentUrl, {
      "method": "POST", 
      "body": JSON.stringify(paymentData), 
      "headers": paymentHeaders
    }).then(res => res.json())
      .then(json => window.location.href = json.payment_link); // window.location.href = json.payment_link
  }

  // window.location.href --- välisele URLile suunamine
  // navigate("/"), <Link to="/" --- suuname mingile muule URL-le meie rakenduses

  return (
    <div>
      <div className="cart-top">
        {cart.length > 0 && <button onClick={empty}>Tühjenda</button>}
        {cart.length === 0 && <div>Ostukorv on tühi. <Link to="/">Lisa tooteid</Link></div> }
        {cart.length === 1 && <div>Ostukorvi on 1 ese</div> }
        {cart.length > 1 && <div>Ostukorvi on {cart.length} erinevat eset, kokku {calculateCartItems()}</div> }
      </div>
      {cart.map( (element, index) => 
        <div key={index} className="product">
          <img className="image" src={element.product.image} alt="" />
          <div className="name">{element.product.name}</div>
          <div className="price">{element.product.price.toFixed(2)} €</div>
          <div className="quantity">
            <img className="button" onClick={() => decreaseQuantity(index)} src={require("../images/minus.png")} alt="" />
            <div>{element.quantity} tk</div>
            <img className="button" onClick={() => increaseQuantity(index)} src={require("../images/add.png")} alt="" />
          </div>
          <div className="total">{(element.product.price * element.quantity).toFixed(2)} €</div>
          <img className="button" onClick={() => removeFromCart(index)} src={require("../images/remove.png")} alt="" />
        </div>)}
        {cart.length > 0 && 
          <div className="cart-bottom">
            <div>{calculateCartSum()} €</div>

            <ParcelMachines />

            <button onClick={pay}>Maksa</button>
          </div>
          }
    </div>
  )
}

export default Cart

// 134 rida --- see on OK
// 150+ rida hakkame mõtlema väljatõstmise
// 200 rida - tõstame välja