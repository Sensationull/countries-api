export const createSearchForAllCountriesEndpoint = () => {
  return 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population'
}

export const createSearchForSomeCountriesEndpoint = (searchTerm: string) => {
  return `https://restcountries.com/v3.1/name/${searchTerm}?fields=name,flags,capital,region,population`
}

export const createFilterCountriesByRegionEndpoint = (region: string) => {
  return `https://restcountries.com/v3.1/region/${region}`
}
