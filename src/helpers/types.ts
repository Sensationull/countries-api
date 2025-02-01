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
