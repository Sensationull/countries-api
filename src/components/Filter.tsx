import './Filter.css';

function Filter() {
    return (
        <select className="filter"> 
            <option>Filter by Region</option>
            <option>Africa</option>
            <option>America</option>
            <option>Asia</option>
        </select>
    )
}

export default Filter