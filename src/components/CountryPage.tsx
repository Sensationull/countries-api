import './CountryPage.css'

type CountryPageProps = {
  showAllCountries(): void
}

function CountryPage({ showAllCountries }: CountryPageProps) {
  return (
    <div className="country-page-container" onClick={showAllCountries}>
      Country Page
    </div>
  )
}

export default CountryPage
