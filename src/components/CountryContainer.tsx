import { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import './CountryContainer.css'
import SearchBar from './SearchBar'


function CountryContainer() {
    /*
    1. Fetch the proper data https://restcountries.com/v3.1/all
    2. Store the data locally
    3. Take the stored data and render it here

    next 
    4. set up Prettier/ES lint to format on save
    5. figure out what to do for overflow
    6. set up filter button position on small screens
    7. Search functionality
    8. Filter functionality
    9. Filter button styling
    */
   const [countries, setCountries] = useState<CountryInfo[] | []>([]);
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population')
        .then((response) => response.json())
        .then((data) => setCountries([...data]))
        .catch((error) => console.log(error))
    },[])

    useEffect(() => {
        console.log({countries})
    },[countries]);

    type CountryInfo = {
        flags: { 
            alt:string;
            png: string; 
            svg: string
        }
        name: {
            common: string;
            nativeName: {
                eng: string; 
                common: string
            }; 
            official: string
        };
        population: string;
        region: string;
        capital: string;
    }

    return (
        <main className="country-container">
            <SearchBar/>
            <div className='country-card-container'>
                {countries && countries.map((country) => {
                    const {flags, name, population, region, capital} = country;
                    return (
                    <CountryCard 
                        flags={flags}
                        name={name.official}
                        population={population}
                        region={region}
                        capital={capital}
                        key={name.common}
                    />
                )
                })}
            </div>
        </main>
    )
}

export default CountryContainer