import { ChangeEvent } from 'react'
import './Filter.css'

type FilterProps = {
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
}

function Filter({ setSelectedRegion }: FilterProps) {
  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value)
  }

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
    <select
      className="filter"
      name="Regions"
      onChange={handleFilter}
      defaultValue="Filter by region"
    >
      <option disabled>Filter by region</option>
      {regions.map((region) => {
        return (
          <option key={region} value={region}>
            {region}
          </option>
        )
      })}
    </select>
  )
}

export default Filter
