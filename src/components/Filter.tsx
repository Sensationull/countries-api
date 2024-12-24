import { ChangeEvent } from 'react'
import './Filter.css'

type FilterProps = {
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>
}

function Filter({ setSelectedRegion }: FilterProps) {
  const handleFilter = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log({ target: event.target.value })
    setSelectedRegion(event.target.value)
  }

  const regions = [
    'Africa',
    'Americas',
    'Antarctic Ocean',
    'Asia',
    'Europe',
    'Oceania',
    'Polar',
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
