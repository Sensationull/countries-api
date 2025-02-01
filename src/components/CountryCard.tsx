import { Link } from 'react-router'
import './CountryCard.css'
import { CountryCardProps } from '../helpers/types'

function CountryCard({
  flags,
  name,
  population,
  region,
  capital,
}: CountryCardProps) {
  return (
    <Link to={`country/${name}`} className="link">
      <div className="country-card">
        <img className="country-flag" src={flags.png} alt={flags.alt} />
        <div className="country-info">
          <div className="country-name">{name}</div>
          <div className="country-population">
            Population:{' '}
            <span className="card-data">
              {Number(population).toLocaleString()}
            </span>
          </div>
          <div className="country-region">
            Region: <span className="card-data">{region}</span>
          </div>
          <div className="country-capital">
            Capital: <span className="card-data">{capital}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
