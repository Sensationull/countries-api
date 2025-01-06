import { BaseSyntheticEvent, useState } from 'react'
import './Filter.css'
import { DownArrow } from './DownArrow'

type FilterProps = {
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
}

function Filter({ setSelectedRegion }: FilterProps) {
  const [menuIsOpen, setMenuIsOpen] = useState({ dropdown: false })
  const [buttonName, setButtonName] = useState('Filter By Region')

  const handleFilter = (event: BaseSyntheticEvent) => {
    if (event.target.textContent) {
      setSelectedRegion(event.target.textContent)
      setButtonName(event.target.textContent)
    }
    setMenuIsOpen({ dropdown: !menuIsOpen.dropdown })
  }

  const handleDropdownClick = () =>
    setMenuIsOpen({ dropdown: !menuIsOpen.dropdown })

  const regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    // 'Polar', These may only exist in the data.json file
    // 'Antarctic Ocean',
  ]

  return (
    <nav className="dropdown-container">
      <button type="button" className="button" onClick={handleDropdownClick}>
        {buttonName}
        <DownArrow />
      </button>
      {menuIsOpen.dropdown && (
        <div className="dropdown">
          <ul>
            {regions.map((region) => (
              <li key={region} onClick={handleFilter} value={region}>
                {region}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Filter
