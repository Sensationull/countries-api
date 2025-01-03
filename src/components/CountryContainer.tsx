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

type CountryContainerProps = {
  showSpecificCountry(country: string): void
}

function CountryContainer({ showSpecificCountry }: CountryContainerProps) {
  /*
    7. Search functionality
        d. debouncing *Challenge*
    8. Filter functionality
        d. *Challenge! Pulling the regions from the API and memoizing that info?*
        e. Is there a way to not pass the setSelectedRegion through SearchBar?
        f. Is there a way to DRY up fetch calls and function defs? 
    9. Filter button styling
        b. style the options nope, see:
        https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#:~:text=The%20%3Cselect%3E%20element%20is,WAI%2DARIA%20to%20provide%20semantics.
    12. ~Challenge~ Pagination on main page?
    */

  // ~ State management ~
  const [value, setValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState('')
  const [countryData, setCountryData] = useState<CountryData>({
    data: [],
    isLoading: false,
    error: null,
  })
  const [selectedRegion, setSelectedRegion] = useState('')

  // ~ Lifecycle methods ~
  useEffect(() => {
    if (debouncedValue) {
      fetchSpecificCountries(debouncedValue)
    } else {
      fetchInitialCountries()
    }
  }, [debouncedValue])

  useEffect(() => {
    if (selectedRegion) {
      fetchCountriesByRegion()
    }
  }, [selectedRegion])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [value])

  // ~ fetch functions ~
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
        console.error(error)
      })
  }

  const fetchSpecificCountries = async (searchTerm: string) => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${searchTerm}?fields=name,flags,capital,region,population`
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

  const fetchCountriesByRegion = async () => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${selectedRegion}`
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

  // ~ event handlers ~
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <main className="country-container">
      <SearchBar
        value={value}
        handleSearch={handleSearch}
        setSelectedRegion={setSelectedRegion}
      />
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
                name={name.common}
                population={population}
                region={region}
                capital={capital}
                key={name.common}
                showSpecificCountry={showSpecificCountry}
              />
            )
          })}
      </div>
    </main>
  )
}

export default CountryContainer
