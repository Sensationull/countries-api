
import './CountryCard.css';

type CountryCardProps = {
    flags: { alt:string; png: string; svg: string}
    name: string;
    population: string;
    region: string;
    capital: string;
}

function CountryCard({flags, name, population, region, capital}: CountryCardProps) {
    return (
            <div className='country-card'>
                <div className="country-flag">
                    <img src={flags.png} alt={flags.alt}/>
                </div>
                <div className="country-info">
                    <div className='country-name'>{name}</div>
                    <div className='country-population'>Population: <span className="card-data">{population}</span></div>
                    <div className='country-region'>Region: <span className="card-data">{region}</span></div>
                    <div className='country-capital'>Capital: <span className="card-data">{capital}</span></div>
                </div>
            </div>
    )
}

export default CountryCard;