import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './i18n';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// npm i react-bootstrap ---> paneb KÕIK failid node_module kausta
// let kogus = 0
// kogus = 1;    ----> kogus on 1

//import 'bootstrap/dist/css/bootstrap.min.css';   .active {color: white};
//import './index.css';                            .active {color: green};