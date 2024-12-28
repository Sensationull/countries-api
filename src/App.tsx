import Header from './components/Header'
import CountryContainer from './components/CountryContainer'
import CountryPage from './components/CountryPage'
import { useState } from 'react'

function App() {
  const [showCountryPage, setShowCountryPage] = useState(false)

  const showAllCountries = () => {
    setShowCountryPage((shouldCountryPageShow) => !shouldCountryPageShow)
  }

  return (
    <div className="main">
      <Header />
      {!showCountryPage && (
        <CountryContainer setShowCountryPage={setShowCountryPage} />
      )}
      {showCountryPage && <CountryPage showAllCountries={showAllCountries} />}
    </div>
  )
}

export default App
