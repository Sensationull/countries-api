import { AnimatePresence, motion } from 'motion/react'
import { ChangeEvent, useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import './CountryContainer.css'
import Search from './Search'
import Filter from './Filter'

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
    fetchCountries(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    if (selectedRegion) {
      fetchCountriesByRegion(selectedRegion)
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

  // ~ API requests ~

  const fetchCountries = async (searchTerm: string) => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })

    const searchForAllCountries =
      'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population'
    let searchEndpoint = searchForAllCountries
    const searchForSomeCountries = `https://restcountries.com/v3.1/name/${searchTerm}?fields=name,flags,capital,region,population`
    if (searchTerm !== '') {
      searchEndpoint = searchForSomeCountries
    }

    const response = await fetch(searchEndpoint)
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

  const fetchCountriesByRegion = async (region: string) => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
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
      <div className="search-bar-container">
        <div className="search-bar">
          <Search />
          <input
            placeholder="Search for a country..."
            value={value}
            onChange={handleSearch}
          />
        </div>
        <Filter setSelectedRegion={setSelectedRegion} />
      </div>

      <div className="country-card-container">
        <AnimatePresence>
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
                <motion.div
                  key={name.common}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                >
                  <CountryCard
                    flags={flags}
                    name={name.common}
                    population={population}
                    region={region}
                    capital={capital}
                    key={name.common}
                  />
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>
    </main>
  )
}

export default CountryContainer
