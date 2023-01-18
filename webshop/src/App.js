import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from "./pages/Cart";
// import {ContactUs} from "./pages/ContactUs";
import ContactUs from "./pages/ContactUs";
import HomePage from "./pages/HomePage";
import Shops from "./pages/Shops";
import SingleProduct from "./pages/SingleProduct";
import AdminHome from "./pages/admin/AdminHome";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import MaintainCategories from "./pages/admin/MaintainCategories";
import MaintainShops from "./pages/admin/MaintainShops";
import MaintainProducts from "./pages/admin/MaintainProducts";
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext } from 'react';
import AuthContext from './store/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="contact" element={ <ContactUs /> } />
        <Route path="shops" element={ <Shops /> } />
        <Route path="product" element={ <SingleProduct /> } />
        {authCtx.loggedIn === false && <>
          <Route path="login" element={ <Login /> } />
          <Route path="signup" element={ <Signup /> } />
        </>}

        {authCtx.loggedIn === true && <>
          <Route path="login" element={ <Navigate to="/admin"/> } />
          <Route path="signup" element={ <Navigate to="/admin"/> } />
        </>}

        {authCtx.loggedIn === true && <>
          <Route path="admin" element={ <AdminHome /> } />
          <Route path="admin/add-product" element={ <AddProduct /> } />
          <Route path="admin/edit-product/:id" element={ <EditProduct /> } />
          <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
          <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
          <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
        </>}
        {authCtx.loggedIn === false && <>
          <Route path="admin/*" element={ <Navigate to="/login"/> } />
        </>}
      </Routes>


    </div>
  );
}

export default App;


// algus: 21.11
// lõpp: 30.01


// 15.detsember - 5
// 19.detsember - 6
// 22.detsember - 7
// 27.detsember - 8
// 29.detsember - 9  9.00-12.45   
// Leaflet kaardirakendus, emailjs emaili saatmiseks, Firebase ülespanemiseks, react toastify

// 2.jaanuar E - 10  9.00-12.45
// ostukorvi loogikat - teen samasuguseks kui teil, lisaks koguste süsteem koos, lisaks kujundus
// objekt objekti sees <------
// sorteerimine
// kategooriate järgi filtreerimine

// 4.jaanuar K - 11  9.00-12.45
// API päringud - pakiautomaatide võtmine Omniva lehelt, tooted andmebaasist, andmebaasi
// select + option
// useEffect() <-----   fetch().then().then()    GET   <-----     fetch("",{})
// Postman programm

// 9.jaanuar E - 13    9.00-11.30
// API päringud - kategooriad andmebaasi, kategooriad tuleks dropdownist, 
//  poed tuleks andmebaasist   MaintainShops.jsx
// select + option
// loader <- keerleb kui lehte laetakse
// API päringud - makse: EveryPay
// fetch("", {}).then().then()

// 11.jaanuar K - 14    9.00-12.45
// props ehk child componendid, kasutan ühte faili teise sees

// 16.jaanuar E - 15     9.00-12.45
// props jätk
// dünaamiline CSS
// useContext() <--- globaalne muutuja   ostukorvi kogusumma Navbari, avalehele, ostukorvi

// 18.jaanuar K - 16    9.00-12.45
// lahendame proovitöö esimest punkti
// useContext() <--- globaalne muutuja
// sisselogimine/registreerumine    Firebase kaudu

// 23.jaanuar - 17    9.00-12.45
// lahendan TWN proovitöö ära
// võime teha e-maili saatmise maksmise asemel radio-button

// 30.jaanuar - 18 ---> poolik päev, projekti kirjutamine