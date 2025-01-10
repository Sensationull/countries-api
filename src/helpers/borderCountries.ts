import { default as data } from '../../data.json'

export const getBorderCountryName = (alphaCode: string) => {
  console.log({ alphaCode })
  console.log({ data: data })
  /*
    Given a of code, iterate over the data to find the matching country name.
  */
  const matchingCountry = data.find((item) => item.alpha3Code === alphaCode)
  let name
  if (matchingCountry) {
    name = matchingCountry?.name
  }
  return name
}
