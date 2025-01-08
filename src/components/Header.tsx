import { useContext } from 'react'
import './Header.css'
import { Moon } from './Moon'
import { ThemeContext } from '../ThemeContext'
import { Link } from 'react-router'

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  return (
    <nav className="header">
      <Link to="/" className="link">
        Where in the world?
      </Link>
      <button className="dark-mode-container" onClick={toggleDarkMode}>
        <Moon />
        {darkMode ? 'Light Mode ' : 'Dark Mode'}
      </button>
    </nav>
  )
}

export default Header
