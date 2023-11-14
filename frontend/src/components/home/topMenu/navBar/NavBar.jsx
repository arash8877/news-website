import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="has-background-danger py-5 my-4">
        <div className="container">
            <div className="nav">
                <ul className="is-flex nav-ul">
                    <li><Link>Home</Link></li>
                    <li><Link>About Us</Link></li>
                    <li><Link>Contact</Link></li>
                </ul>
            </div>
        </div>
    </header>
  )
}

export default NavBar;