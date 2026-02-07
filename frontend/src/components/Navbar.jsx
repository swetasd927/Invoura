import React from 'react'
import { Link } from "react-router-dom";

import {navbarStyles} from '../assets/dummyStyles';
import logo from '../assets/transparentLogo.png'

const Navbar = () => {
  return (
    <header className={navbarStyles.header}>
        <div className={navbarStyles.container}>
            <nav className={navbarStyles.logoSection}>
                <div className={navbarStyles.logoSection}>
                    <Link to = '/' className = {navbarStyles.logoLink}>
                        <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
                        <span className={navbarStyles.logoText}>Invoura</span>

                    </Link>
                </div>
            </nav>
        </div>

    </header>
  )
}

export default Navbar