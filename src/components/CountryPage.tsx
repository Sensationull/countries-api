import { useEffect, useState } from 'react'
import './CountryPage.css'
import { BackArrow } from './BackArrow'
import { Link, useParams } from 'react-router'
import { getBorderCountryName } from '../helpers/borderCountries'
import { AnimatePresence, motion } from 'motion/react'
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

type SingleCountryData = {
  data: CountryPageInfo[] | []
  isLoading: boolean
  error: { status: number; message: string } | null
}

function CountryPage() {
  const { name } = useParams()

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
      `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,flags,capital,region,languages,population,subregion,tld,currencies,borders`
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
    if (name) {
      fetchCountryInfo(name)
    }
  }, [name])

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
    <AnimatePresence>
      <motion.main
        className="country-page-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0 }}
      >
        <Link to="/countries-api" className="link">
          <button className="back-button">
            <BackArrow />
            Back
          </button>
        </Link>
        <section className="country-page-info">
          <img
            className="country-page-flag-xl"
            src={singleCountryInfo.data[0].flags.svg}
            alt={singleCountryInfo.data[0].flags.alt}
          />
          <aside className="country-page-text-container">
            <div className="country-page-name-header">
              {singleCountryInfo.data[0].name.common}
            </div>
            <div className="country-page-description-container">
              <div className="country-page-basic-info">
                <div className="country-page-name-native">
                  Native Name:{' '}
                  <span className="country-page-data">
                    {
                      Object.values(
                        singleCountryInfo.data[0].name.nativeName
                      )[0].official
                      // Gotta figure out something better than this
                    }
                  </span>
                </div>
                <div className="country-page-population">
                  Population:{' '}
                  <span className="country-page-data">
                    {Number(
                      singleCountryInfo.data[0].population
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="country-page-region">
                  Region:{' '}
                  <span className="country-page-data">
                    {singleCountryInfo.data[0].region}
                  </span>
                </div>
                {singleCountryInfo.data[0].subregion && (
                  <div className="country-page-subregion">
                    Sub Region:{' '}
                    <span className="country-page-data">
                      {singleCountryInfo.data[0].subregion}
                    </span>
                  </div>
                )}
                {singleCountryInfo.data[0].capital && (
                  <div className="country-page-capital">
                    Capital:{' '}
                    <span className="country-page-data">
                      {singleCountryInfo.data[0].capital}
                    </span>
                  </div>
                )}
              </div>
              <div className="country-page-advanced-info">
                <div className="country-page-tld">
                  Top Level Domain:{' '}
                  <span className="country-page-data">
                    {singleCountryInfo.data[0].tld}
                  </span>
                </div>
                <div className="country-page-currencies">
                  Currencies:{' '}
                  <span className="country-page-data">
                    {
                      Object.values(singleCountryInfo.data[0].currencies)[0]
                        .name
                    }
                  </span>
                </div>
                <div className="country-page-languages">
                  Languages:{' '}
                  <span className="country-page-data">
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
              <div className="country-page-border-container">
                <span className="country-page-borders">
                  Border Countries:{' '}
                  <span className="country-page-border-buttons">
                    {Object.values(singleCountryInfo.data[0].borders).map(
                      (border) => (
                        <Link
                          key={border}
                          to={`/countries-api/country/${getBorderCountryName(border)}`}
                        >
                          <button className="border-country-page-button">
                            {getBorderCountryName(border)}
                          </button>
                        </Link>
                      )
                    )}
                  </span>
                </span>
              </div>
            )}
          </aside>
        </section>
      </motion.main>
    </AnimatePresence>
  )
}

export default CountryPage
