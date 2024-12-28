import Header from './components/Header'
import CountryContainer from './components/CountryContainer'
import CountryPage from './components/CountryPage'
import { useState } from 'react'

function App() {
  const [showCountryPage, setShowCountryPage] = useState({
    shouldShowCountryPage: false,
    country: '',
  })

  const showAllCountries = () => {
    setShowCountryPage({ shouldShowCountryPage: false, country: '' })
  }

  const showSpecificCountry = (country: string) => {
    // can this be useContext or custom hook?
    setShowCountryPage({ shouldShowCountryPage: true, country })
  }

  return (
    <div className="main">
      <Header />
      {!showCountryPage.shouldShowCountryPage && (
        <CountryContainer showSpecificCountry={showSpecificCountry} />
      )}
      {showCountryPage.shouldShowCountryPage && (
        <CountryPage
          showAllCountries={showAllCountries}
          showCountryPage={showCountryPage}
        />
      )}
    </div>
  )
}

export default App
