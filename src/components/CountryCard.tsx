
import './CountryCard.css';

function CountryCard() {
    return (
        <div className="country-card-container">
            <div className='country-card'>
                <div className="country-flag">Flag img go brr</div>
                <div className="country-info">
                    <div className='country-name'>Brazil</div>
                    <div className='country-population'>Population: <span className="card-data">206,135,893</span></div>
                    <div className='country-region'>Region: <span className="card-data">Americas</span></div>
                    <div className='country-capital'>Capital: <span className="card-data">Brasilia</span></div>
                </div>
            </div>
        </div>
    )
}

export default CountryCard;