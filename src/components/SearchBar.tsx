import { ChangeEvent } from 'react'
import Filter from './Filter'
import Search from './Search'
import './SearchBar.css'

type SearchBar = {
  value: string
  handleSearch(event: ChangeEvent<HTMLInputElement>): void
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
}

function SearchBar({ value, handleSearch, setSelectedRegion }: SearchBar) {
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
      <Filter setSelectedRegion={setSelectedRegion} />
    </div>
  )
}

export default SearchBar
