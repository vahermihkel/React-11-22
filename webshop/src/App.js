import { Link, Route, Routes } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';

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


function App() {
  const { t, i18n } = useTranslation();

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
            <Nav.Link as={Link} to="/contact">{t('contact')}</Nav.Link>
            <Nav.Link as={Link} to="/shops">{t('shops')}</Nav.Link>
            <Nav.Link as={Link} to="/cart">{t('cart')}</Nav.Link>
          </Nav>
        </Container>
        <img className="lang" onClick={() => changeLang("en")} src={require("./images/english.png")} alt="" />
        <img className="lang" onClick={() => changeLang("ee")} src={require("./images/estonia.png")} alt="" />
      </Navbar>

      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="cart" element={ <Cart /> } />
        <Route path="contact" element={ <ContactUs /> } />
        <Route path="shops" element={ <Shops /> } />
        <Route path="product" element={ <SingleProduct /> } />
        <Route path="admin" element={ <AdminHome /> } />
        <Route path="admin/add-product" element={ <AddProduct /> } />
        <Route path="admin/edit-product/:id" element={ <EditProduct /> } />
        <Route path="admin/maintain-products" element={ <MaintainProducts /> } />
        <Route path="admin/maintain-categories" element={ <MaintainCategories /> } />
        <Route path="admin/maintain-shops" element={ <MaintainShops /> } />
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

// 4.jaanuar K - 11  9.00-12.45
// API päringud - pakiautomaatide võtmine Omniva lehelt, tooted andmebaasist, andmebaasi
// select + option
// useEffect() <-----   fetch().then().then()    GET   <-----     fetch("",{})
// Postman programm

// 6.jaanuar R - 12    9.00-10.30
// API päringud - makse: EveryPay
// fetch("", {}).then().then()

// 9.jaanuar - 13
// API päringud - kategooriad andmebaasi, kategooriad tuleks dropdownist, 
//  poed tuleks andmebaasist   MaintainShops.jsx
// select + option
// loader <- keerleb kui lehte laetakse

// 11.jaanuar - 14
// props ehk child componendid, kasutan ühte faili teise sees

// 16.jaanuar - 15
// useContext() <--- globaalne muutuja   ostukorvi kogusumma Navbari, avalehele, ostukorvi

// 18.jaanuar - 16
// useContext() <--- globaalne muutuja
// sisselogimine/registreerumine    Firebase kaudu

// 23.jaanuar - 17
// räägin hiljem
// võime teha e-maili saatmise maksmise asemel radio-button

// 30.jaanuar - 18 ---> poolik päev, projekti kirjutamine