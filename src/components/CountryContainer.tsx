import { ChangeEvent, useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import './CountryContainer.css'
import SearchBar from './SearchBar'

type CountryInfo = {
  flags: {
    alt: string
    png: string
    svg: string
  }
  name: {
    common: string
    nativeName: {
      eng: string
      common: string
    }
    official: string
  }
  population: string
  region: string
  capital: string
}

type CountryData = {
  data: CountryInfo[] | []
  isLoading: boolean
  error: { status: number; message: string } | null
}

function CountryContainer() {
  /*
    7. Search functionality
        a. Create controlled react input field Done
        b. fetch according countries Done
        c. handle error states ~ current
            1. error states now configured, display error done
        d. debouncing 
    8. Filter functionality
    
    6. set up filter button position on small screens
    5. figure out what to do for overflow
    9. Filter button styling
    */
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState<CountryData>({
    data: [],
    isLoading: false,
    error: null,
  })

  const fetchInitialCountries = async () => {
    setCountryData({ data: [], isLoading: true, error: null })
    await fetch(
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population'
    )
      .then((response) => response.json())
      .then((data) =>
        setCountryData({ data: [...data], isLoading: false, error: null })
      )
      .catch((error) => {
        setCountryData({
          data: [],
          isLoading: false,
          error: { status: error.status, message: error.message },
        })
        console.log(error)
      })
  }

  const fetchSpecificCountries = async () => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${value}?fields=name,flags,capital,region,population`
    )
    if (!response.ok) {
      const error = await response.text()
      const parsedError = JSON.parse(error)
      setCountryData({
        data: [...countryData.data],
        isLoading: false,
        error: { status: parsedError.status, message: parsedError.message },
      })
      throw new Error(error)
    }
    const data = await response.json()
    setCountryData({ data: [...data], isLoading: false, error: null })
  }

  useEffect(() => {
    fetchInitialCountries()
  }, [])

  useEffect(() => {
    if (value) {
      fetchSpecificCountries()
    }
  }, [value])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <main className="country-container">
      <SearchBar value={value} handleSearch={handleSearch} />
      <div className="country-card-container">
        {countryData.isLoading && <div>Loading...</div>}
        {countryData.error && (
          <>
            <div>{countryData.error.status}</div>
            <div>{countryData.error.message}</div>
          </>
        )}
        {countryData.data &&
          !countryData.isLoading &&
          !countryData.error &&
          countryData.data.map((country) => {
            const { flags, name, population, region, capital } = country
            return (
              <CountryCard
                flags={flags}
                name={name.official}
                population={population}
                region={region}
                capital={capital}
                key={name.common}
              />
            )
          })}
      </div>
    </main>
  )
}

export default CountryContainer
