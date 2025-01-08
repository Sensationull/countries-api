import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.tsx'
import { ThemeProvider } from './ThemeContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import CountryContainer from './components/CountryContainer.tsx'
import CountryPage from './components/CountryPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<CountryContainer />} />
            <Route path="/country/:name" element={<CountryPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
