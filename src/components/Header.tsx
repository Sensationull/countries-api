import './Header.css';
import { Moon } from './Moon';


function Header () {
    return (
        <div className="header">
            Where in the world?
            <button className="dark-mode-container">
                <Moon/>
                Dark Mode
            </button>
        </div>
    )
}

export default Header;