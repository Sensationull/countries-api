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
        d. debouncing *Challenge*
    8. Filter functionality
        a. Gather filter regions and map them out into 
            the options for the filter component Done
        b. hit https://restcountries.com/v3.1/region/{region} with that
            selected region Done
        c. update the countries displayed when the data returns Done
        d. *Challenge! Pulling the regions from the API and memoizing that info?*
        e. Is there a way to not pass the setSelectedRegion through SearchBar?
        f. Is there a way to DRY up fetch calls and function defs? 


    6. set up filter button position on small screens Done
    5. figure out what to do for overflow Done
    9. Filter button styling
        a. add downward caret 
    10. Dark Mode Done
    11. Single Country View
        a. are routes necessary?
          1. When you click a country card, 
             we take the country name and the remove the CountryContainer component
             with that country name, we fetch all the data about that relative country and display it
             when you navigate back, we mount this component, brand new. 

             How would we deal with keeping track of selected options when hitting the back button?
              several different forms of state management are available as options

        b. hit a different endpoint to get all the flag data
        c. how will hitting the back button work? or hitting the header?
    12. ~Challenge~ Pagination on main page?
    */

  // ~ State management ~
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState<CountryData>({
    data: [],
    isLoading: false,
    error: null,
  })
  const [selectedRegion, setSelectedRegion] = useState('')

  // ~ Lifecycle methods ~
  useEffect(() => {
    fetchInitialCountries()
  }, [])

  useEffect(() => {
    if (value) {
      fetchSpecificCountries()
    }
  }, [value])

  useEffect(() => {
    if (selectedRegion) {
      fetchCountriesByRegion()
    }
  }, [selectedRegion])

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
