import './CountryCard.css'

type CountryCardProps = {
  flags: { alt: string; png: string; svg: string }
  name: string
  population: string
  region: string
  capital: string
  showSpecificCountry(): void
}

function CountryCard({
  flags,
  name,
  population,
  region,
  capital,
  showSpecificCountry,
}: CountryCardProps) {
  return (
    <div className="country-card" onClick={showSpecificCountry}>
      <img className="country-flag" src={flags.png} alt={flags.alt} />
      <div className="country-info">
        <div className="country-name">{name}</div>
        <div className="country-population">
          Population: <span className="card-data">{population}</span>
        </div>
        <div className="country-region">
          Region: <span className="card-data">{region}</span>
        </div>
        <div className="country-capital">
          Capital: <span className="card-data">{capital}</span>
        </div>
      </div>
    </div>
  )
}

export default CountryCard
