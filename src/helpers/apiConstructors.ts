export const createSearchForAllCountriesEndpoint = () =>
  'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population'

export const createSearchForSomeCountriesEndpoint = (searchTerm: string) =>
  `https://restcountries.com/v3.1/name/${searchTerm}?fields=name,flags,capital,region,population`

export const createFilterCountriesByRegionEndpoint = (region: string) =>
  `https://restcountries.com/v3.1/region/${region}`

export const createSingleCountryFetchEndpoint = (countryName: string) =>
  `https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=name,flags,capital,region,languages,population,subregion,tld,currencies,borders`
