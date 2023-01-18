import { useContext, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

function Login() {
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD2dmJDSKf0f9iLTDAech8vzhTPwVqJJWk";
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const login = () => {
    const userData = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value,
      "returnSecureToken": true
    }

    fetch(url, {
      "method": "POST",
      "body": JSON.stringify(userData),
      "headers": {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          setMessage(json.error.message);
        } else {
          authCtx.setLoggedIn(true);
          navigate("/admin");
          sessionStorage.setItem("token", json.idToken);
        }
        
      });
  }

  return (
    <div>
      <div>{message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="password" /> <br />
      <button onClick={login}>Logi sisse</button>
    </div>
  )
}

export default Login