import { ChangeEvent } from 'react'
import Filter from './Filter'
import Search from './Search'
import './SearchBar.css'

type SearchBar = {
  value: string
  handleSearch(event: ChangeEvent<HTMLInputElement>): void
}

function SearchBar({ value, handleSearch }: SearchBar) {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <Search />
        <input
          placeholder="Search for a country..."
          value={value}
          onChange={handleSearch}
        />
      </div>
      <Filter />
    </div>
  )
}

export default SearchBar
