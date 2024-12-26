import { useContext } from 'react'
import './Header.css'
import { Moon } from './Moon'
import { ThemeContext } from '../ThemeContext'

function Header() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext)
  return (
    <div className="header">
      Where in the world?
      <button className="dark-mode-container" onClick={toggleDarkMode}>
        <Moon />
        {darkMode ? 'Light Mode ' : 'Dark Mode'}
      </button>
    </div>
  )
}

export default Header
