import Search from './Search'
import './SearchBar.css'

function SearchBar() {
    return (
        <div className="search-bar-container">
            <div className='search-bar'>
                <Search/>
                <input placeholder="Search for a country..."/>
            </div>
        </div>
    )
}

export default SearchBar