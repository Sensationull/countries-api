import { useEffect, useState } from 'react'
import {
  createFilterCountriesByRegionEndpoint,
  createSearchForAllCountriesEndpoint,
  createSearchForSomeCountriesEndpoint,
} from '../helpers/apiConstructors'
import { CountryData } from '../helpers/types'

export const useCountries = (debouncedValue: string) => {
  const [countryData, setCountryData] = useState<CountryData>({
    data: [],
    isLoading: false,
    error: null,
  })
  const [selectedRegion, setSelectedRegion] = useState('')

  useEffect(() => {
    fetchCountries(debouncedValue)
  }, [debouncedValue])

  useEffect(() => {
    if (selectedRegion) {
      fetchCountriesByRegion(selectedRegion)
    }
  }, [selectedRegion])

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

  const handleSelectedRegion = (region: string) => {
    setSelectedRegion(region)
  }

  return { countryData, handleSelectedRegion }
}
