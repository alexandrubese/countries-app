import { useState } from "react";

const CountryFilters = (props) => {
    const [search, setSearch] = useState('');
    const [regionFilter, setRegionFilter] = useState('');

    const onInputChangeHandler = (event) => {
        setSearch(event.target.value);
        props.onSearchHandler(event.target.value);
    }

    const onDropdownChangeHandler = (event) => {
        setRegionFilter(event.target.value);
        props.onRegionHandler(event.target.value);
    }

    return (
        <div className="filter-container">
            <input type="text" onChange={onInputChangeHandler} value={search} />

            <select 
                name="filter-region" 
                id="filter-region" 
                onChange={onDropdownChangeHandler} 
                value={regionFilter}
                >
                    <option value="" defaultValue="">Filter By Region</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
            </select>
        </div>
    )
}

export default CountryFilters;