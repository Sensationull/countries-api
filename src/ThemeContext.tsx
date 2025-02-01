import { createContext, useEffect, useState } from 'react'
import { ThemeProviderProps } from './helpers/types'

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
  /* Needed default values? */
})

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : null
    if (currentTheme === 'dark') {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode((previousMode) => !previousMode)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}
