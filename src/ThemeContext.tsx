import { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {
    console.log('hello') // is this necessary?
  },
})

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.body.setAttribute('data-theme', 'dark')
    } else {
      document.body.removeAttribute('data-theme')
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
