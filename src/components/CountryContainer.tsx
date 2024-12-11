import CountryCard from './CountryCard'
import './CountryContainer.css'
import SearchBar from './SearchBar'


function CountryContainer() {
    return (
        <main className="country-container">
            <SearchBar/>
            <div className='country-card-container'>
                <CountryCard/>
                <CountryCard/>
                <CountryCard/>
                <CountryCard/>
                <CountryCard/>
                <CountryCard/>
                <CountryCard/>
                <CountryCard/>
            </div>
        </main>
    )
}

export default CountryContainer