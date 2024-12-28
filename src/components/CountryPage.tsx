import { useEffect, useState } from 'react'
import './CountryPage.css'

type CountryPageInfo = {
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
  population: number
  region: string
  capital: string
  subregion: string
  tld: string[]
  languages: { [key: string]: string }
  currencies: { name: string; symbol: string }
  borders: string[]
}

type CountryPageProps = {
  showAllCountries(): void
  showCountryPage: { shouldShowCountryPage: boolean; country: string }
}

type SingleCountryData = {
  data: CountryPageInfo[] | []
  isLoading: boolean
  error: { status: number; message: string } | null
}

function CountryPage({ showAllCountries, showCountryPage }: CountryPageProps) {
  const [singleCountryInfo, setSingleCountryInfo] = useState<SingleCountryData>(
    {
      data: [],
      isLoading: false,
      error: null,
    }
  )

  const fetchCountryInfo = async () => {
    setSingleCountryInfo({ data: [], isLoading: true, error: null })
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${showCountryPage.country}?fields=name,flags,capital,region,languages,population,subregion,tld,currencies,borders`
    )
    if (!response.ok) {
      const error = await response.text()
      const parsedError = JSON.parse(error)
      setSingleCountryInfo({ data: [], isLoading: false, error: parsedError })
      throw new Error(error)
    }
    const countryData = await response.json()
    console.log({ countryData })
    setSingleCountryInfo({
      data: [...countryData],
      isLoading: false,
      error: null,
    })
  }

  useEffect(() => {
    fetchCountryInfo()
  }, [])

  if (singleCountryInfo.error) {
    return (
      <div className="country-page-container">
        <div>There was an error {singleCountryInfo.error.message}</div>
      </div>
    )
  }

  if (singleCountryInfo.isLoading) {
    return (
      <div className="country-page-container">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="country-page-container" onClick={showAllCountries}>
      {showCountryPage.country}
    </div>
  )
}

export default CountryPage
