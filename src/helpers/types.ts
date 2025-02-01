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

export type CountryData = {
  data: CountryInfo[] | []
  isLoading: boolean
  error: { status: number; message: string } | null
}

export type FilterProps = {
  onSelectRegion: (region: string) => void
}

type CountryPageInfo = Omit<CountryInfo, 'name'> & {
  name: {
    common: string
    nativeName: {
      [key: string]: { official: string; common: string }
    }
    official: string
  }
  subregion: string
  tld: string[]
  languages: { [key: string]: string }
  currencies: { [key: string]: { name: string; symbol: string } }
  borders: string[]
}

export type SingleCountryData = {
  data: CountryPageInfo[] | []
  isLoading: boolean
  error: { status: number; message: string } | null
}

export type CountryCardProps = {
  flags: { alt: string; png: string; svg: string }
  name: string
  population: string
  region: string
  capital: string
}

export type ThemeProviderProps = {
  children: JSX.Element | JSX.Element[]
}
