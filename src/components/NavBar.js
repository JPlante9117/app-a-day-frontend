import React from 'react'
import { Link } from 'react-router-dom'
import '../navbar.css'
import logo from '../assets/app-a-daylogo.png'

const NavBar = props => {
        return(
        <div className="nav-wrapper" style={{display: props.location.pathname === "/" ? "none" : null}}>
            <div className="nav-wrapper-inner">
                <div className="nav-logo">
                    <Link to="/" className="nav-link"><img className="logo" src={logo} /></Link>
                </div>
                <div className="nav-logo-ext">
                </div>
                <ul className="nav-link-list">
                    <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/jobs" className="nav-link">
                        My Applications
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/goals" className="nav-link">
                        My Goals
                    </Link>
                    </li>
                </ul>
            </div>

        </div>
        )
}

export default NavBar