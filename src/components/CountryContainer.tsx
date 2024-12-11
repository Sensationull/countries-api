import CountryCard from './CountryCard'
import './CountryContainer.css'
import SearchBar from './SearchBar'


function CountryContainer() {
    return (
        <main className="country-container">
            <SearchBar/>
            <CountryCard/>
        </main>
    )
}

export default CountryContainer