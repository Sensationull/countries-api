import { useEffect, useState } from 'react'
import './CountryPage.css'
import { BackArrow } from './BackArrow'

type CountryPageInfo = {
  flags: {
    alt: string
    png: string
    svg: string
  }
  name: {
    common: string
    nativeName: {
      [key: string]: { official: string; common: string }
    }
    official: string
  }
  population: number
  region: string
  capital: string
  subregion: string
  tld: string[]
  languages: { [key: string]: string }
  currencies: { [key: string]: { name: string; symbol: string } }
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

  const fetchCountryInfo = async (countryName: string) => {
    setSingleCountryInfo({ data: [], isLoading: true, error: null })
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}?fields=name,flags,capital,region,languages,population,subregion,tld,currencies,borders`
    )
    if (!response.ok) {
      const error = await response.text()
      const parsedError = JSON.parse(error)
      setSingleCountryInfo({ data: [], isLoading: false, error: parsedError })
      throw new Error(error)
    }
    const countryData = await response.json()
    setSingleCountryInfo({
      data: [...countryData],
      isLoading: false,
      error: null,
    })
  }

  useEffect(() => {
    fetchCountryInfo(showCountryPage.country)
  }, [])

  if (singleCountryInfo.error) {
    return (
      <div className="country-page-container">
        <div>There was an error {singleCountryInfo.error.message}</div>
      </div>
    )
  }

  if (singleCountryInfo.isLoading || !singleCountryInfo.data.length) {
    return (
      <div className="country-page-container">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <main className="country-page-container">
      <button className="back-button" onClick={showAllCountries}>
        <BackArrow />
        Back
      </button>
      <section className="country-page-info">
        <img
          className="country-flag-xl"
          src={singleCountryInfo.data[0].flags.svg}
          alt={singleCountryInfo.data[0].flags.alt}
        />
        <aside className="country-text-container">
          <div className="country-name-header">
            {singleCountryInfo.data[0].name.common}
          </div>
          <div className="country-description-container">
            <div className="country-basic-info">
              <div className="country-name-native">
                Native Name:{' '}
                <span className="country-data">
                  {
                    Object.values(singleCountryInfo.data[0].name.nativeName)[0]
                      .official
                    // Gotta figure out something better than this
                  }
                </span>
              </div>
              <div className="country-population">
                Population:{' '}
                <span className="country-data">
                  {Number(
                    singleCountryInfo.data[0].population
                  ).toLocaleString()}
                </span>
              </div>
              <div className="country-region">
                Region:{' '}
                <span className="country-data">
                  {singleCountryInfo.data[0].region}
                </span>
              </div>
              {singleCountryInfo.data[0].subregion && (
                <div className="country-subregion">
                  Sub Region:{' '}
                  <span className="country-data">
                    {singleCountryInfo.data[0].subregion}
                  </span>
                </div>
              )}
              {singleCountryInfo.data[0].capital && (
                <div className="country-capital">
                  Capital:{' '}
                  <span className="country-data">
                    {singleCountryInfo.data[0].capital}
                  </span>
                </div>
              )}
            </div>
            <div className="country-advanced-info">
              <div className="country-tld">
                Top Level Domain:{' '}
                <span className="country-data">
                  {singleCountryInfo.data[0].tld}
                </span>
              </div>
              <div className="country-currencies">
                Currencies:{' '}
                <span className="country-data">
                  {Object.values(singleCountryInfo.data[0].currencies)[0].name}
                </span>
              </div>
              <div className="country-languages">
                Languages:{' '}
                <span className="country-data">
                  {Object.values(singleCountryInfo.data[0].languages).map(
                    (language) => (
                      <span key={language}> {language} </span>
                    )
                  )}
                </span>
              </div>
            </div>
          </div>

          {singleCountryInfo.data[0].borders.length > 0 && (
            <div className="country-border-container">
              <span className="country-borders">
                Border Countries:{' '}
                <span className="country-border-buttons">
                  {Object.values(singleCountryInfo.data[0].borders).map(
                    (border) => (
                      <button key={border} className="border-country-button">
                        {border}
                      </button>
                    )
                  )}
                </span>
              </span>
            </div>
          )}
        </aside>
      </section>
    </main>
  )
}

export default CountryPage
