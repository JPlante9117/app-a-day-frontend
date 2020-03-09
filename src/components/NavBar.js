import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = props => {
    return(
        <nav>
            <h3>LOGO</h3>
            <ul className="navLinks">
                <Link to="/dashboard">
                    Dashboard
                </Link>
                <Link to="/jobs">
                    My Applications
                </Link>
                <Link to="/goals">
                    My Goals
                </Link>
            </ul>
        </nav>
    )
}

export default NavBar