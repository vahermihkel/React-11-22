import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkIfTokenInSS());

  function checkIfTokenInSS() {
    if (sessionStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{
      loggedIn: isLoggedIn,
      setLoggedIn: setIsLoggedIn
    }}>
      {props.children}
    </AuthContext.Provider>
  )
} 

export default AuthContext;