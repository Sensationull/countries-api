import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react'
import './Filter.css'
import { DownArrow } from './DownArrow'

type FilterProps = {
  onSelectRegion: (region: string) => void
}

function Filter({ onSelectRegion }: FilterProps) {
  const [menuIsOpen, setMenuIsOpen] = useState({ dropdown: false })
  const [buttonName, setButtonName] = useState('Filter By Region')
  const container = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      container.current &&
      !container.current.contains(event.target as Node)
      /* Suggested cast: https://stackoverflow.com/questions/61164018/typescript-ev-target-and-node-contains-eventtarget-is-not-assignable-to-node */
    ) {
      setMenuIsOpen({ dropdown: false })
    }
  }

  const handleFilter = (event: BaseSyntheticEvent) => {
    if (event.target.textContent) {
      onSelectRegion(event.target.textContent)
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
    <nav className="dropdown-container" ref={container}>
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
