import { AnimatePresence, motion } from 'motion/react'
import { ChangeEvent, useState } from 'react'
import CountryCard from './CountryCard'
import './CountryContainer.css'
import Search from './Search'
import Filter from './Filter'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useCountries } from '../hooks/useCountries'

function CountryContainer() {
  // ~ State management // hooks ~
  const [value, setValue] = useState('')
  const [debouncedValue] = useDebouncedValue(value)
  const { countryData, handleSelectedRegion } = useCountries(debouncedValue)

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
        <Filter onSelectRegion={handleSelectedRegion} />
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
