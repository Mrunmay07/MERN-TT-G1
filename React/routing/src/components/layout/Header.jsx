import { NavLink } from 'react-router-dom'
import '../../styles/Header.css'

function Header(){
    return(
        <header className="navbar">
            <div>LOGO</div>

            <ul className="nav-links">
                <li><NavLink to="/about">ABOUT</NavLink></li>
                <li><NavLink to="/contact">CONTACT</NavLink></li>
                <li><NavLink to="/movies">MOVIES</NavLink></li>
            </ul>

            <div className="nav-btns">
                <button>SignUp</button>
                <button>Login</button>
            </div>
        </header>
    )
}

export default Header