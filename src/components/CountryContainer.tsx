import { AnimatePresence, motion } from 'motion/react'
import { ChangeEvent, useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import './CountryContainer.css'
import Search from './Search'
import Filter from './Filter'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  createFilterCountriesByRegionEndpoint,
  createSearchForAllCountriesEndpoint,
  createSearchForSomeCountriesEndpoint,
} from '../helpers/apiConstructors'

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
  // ~ State management // hooks ~
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebouncedValue(value)
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

  // ~ API requests ~

  const fetchCountries = async (searchTerm: string) => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })

    const searchEndpoint =
      searchTerm === ''
        ? createSearchForAllCountriesEndpoint()
        : createSearchForSomeCountriesEndpoint(searchTerm)

    const response = await fetch(searchEndpoint)
    await setAndThrowErrorIfNoResponse(response)
    const data = await response.json()
    setCountryData({ data: [...data], isLoading: false, error: null })
  }

  const fetchCountriesByRegion = async (region: string) => {
    setCountryData({
      data: [...countryData.data],
      isLoading: true,
      error: null,
    })
    const response = await fetch(createFilterCountriesByRegionEndpoint(region))
    await setAndThrowErrorIfNoResponse(response)
    const data = await response.json()
    setCountryData({ data: [...data], isLoading: false, error: null })
  }

  const setAndThrowErrorIfNoResponse = async (response: Response) => {
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
            <motion.div
              className="country-errors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div>{countryData.error.status}</div>
              <div>{countryData.error.message}</div>
            </motion.div>
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
                  transition={{ duration: 0.5 }}
                  exit={{ opacity: 0 }}
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
