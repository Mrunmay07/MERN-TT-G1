import '../../styles/Header.css'

function Header(){
    return(
        <header className="navbar">
            <div>LOGO</div>

            <ul className="nav-links">
                <li><a href="">ABOUT</a></li>
                <li><a href="">CONTACT</a></li>
                <li><a href="">MOVIES</a></li>
            </ul>

            <div className="nav-btns">
                <button>SignUp</button>
                <button>Login</button>
            </div>
        </header>
    )
}

export default Header