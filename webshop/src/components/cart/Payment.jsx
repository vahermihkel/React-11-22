
function Payment(props) {

  const pay = () => {
    const paymentUrl = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": props.sum,
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
    <button onClick={pay}>Maksa</button>
  )
}

export default Payment