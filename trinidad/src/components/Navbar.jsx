import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div>
      <div className='twn-header'>
        <button className='toggle-menu'>
          <i></i>
        </button>
      </div>
      <div className='twn-menu'>
        <img className='logo' src={require("../assets/imgs/logo.svg").default} alt="logo" />
        <ul className='nav-link'>
          <li className='nav-link'><Link to="/intro">Nõuded</Link><i className="fa fa-question-circle" aria-hidden="true"></i></li>
          <li className='nav-link'><Link to="/article">Artikkel</Link><i className="fa fa-file" aria-hidden="true"></i></li>
          <li className='nav-link'><Link to="/list">Tabel</Link><i className="fa fa-table" aria-hidden="true"></i></li>
          <li className='nav-link'><Link to="/life">Game of life</Link><i className="fa fa-picture-o" aria-hidden="true"></i>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar