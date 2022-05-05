import { useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import CountryDetails from "./CountryDetails";
import CountryList from "./CountryList";
import classes from "./Countries.module.css";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [countryDetails, setCountryDetails] = useState('');
    const [countryBorders, setCountryBorders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [regionFilter, setRegionFilter] = useState('no-filter');
    const [allCountries, setAllCountries] = useState([]);
    const [theme, setTheme] = useState('day');

    const toggleTheme = () => {
        if(theme === 'day'){
            setTheme('dark');
        } else {
            setTheme('day');
        }
    }

    const getBorderCountries = (clickedCountry) => {
        return allCountries.filter(country => {
            if(clickedCountry.borders && clickedCountry.borders.includes(country.alpha3Code)) {
                return country.name;
            } 
            return;
        })
    }

    const countryCardClickHandler = (countryName) => {
        const country = allCountries.find(country => country.name === countryName);
        const countryBorders = getBorderCountries(country);

        setCountryBorders(countryBorders);
        setCountryDetails(country);
    }

    const countryCardRemoveHandler = () => {
        setCountryDetails('');
    }

    const filterByRegionCallback = (countries, regionFilterCheck) => {
        if(regionFilterCheck === 'no-filter') {
            return countries;
        } 

        return countries.filter(country => country.region.toLowerCase() === regionFilterCheck.toLowerCase()); 
    };

    const getCountries = async () => {
        try {
             //setIsLoading(true);
            const response = await fetch(`${API_URL}/all`, {});
            //setIsLoading(false);               
            if(response.ok) {
               const data = await response.json();
               setAllCountries(data);
               if(regionFilter!=='no-filter') {
                const filteredResultsByRegion = filterByRegionCallback(data, regionFilter);
                setCountries(filteredResultsByRegion);
               } else {
                setCountries(data);
               }
               
            } 
        } catch (error) {
            console.log(`Error while fetching todos: ${error}`);
        }
    };

    useEffect(() => {
       getCountries();
   }, []);

    const createUniqueArray = (array) => {
        const key = 'name';

        const arrayUniqueByKey = [...new Map(array.map(item =>
        [item[key], item])).values()];
        return arrayUniqueByKey;
    }

    const parseResponses = async (successfullResults) => {
        const searchResults = [];

        for(const result of successfullResults) {
            const response = result.value;
            const data = await response.json();

            searchResults.push(data);
        }
  
        const flattedResults = searchResults.flat(2);
        const uniqueResults = createUniqueArray(flattedResults);

        return uniqueResults
    }

    const onInputChange = (event) => {
        setSearchTerm(event.target.value);
        onSearchHandler(event.target.value);
    }

    const onDropdownChange = (event) => {
        setRegionFilter(event.target.value);
        onRegionHandler(event.target.value);
    }

    const onSearchHandler = async (search, latestRegion) => {
        try {
            const regionFilterCheck = latestRegion ? latestRegion : regionFilter;
            if(search === '') {
                await getCountries();
            } else {
                // Search by name
                const searchByNamePromise = fetch(`${API_URL}/name/${search}`, {});
                // Search by Full name
                const searchByFullNamePromise = fetch(`${API_URL}/name/${search}?fullText=true`, {});
                // Search by Code
                const searchByCodePromise = fetch(`${API_URL}/alpha/${search}`, {});
                // Search by LIST OF CODES
                const searchByListOfCodesPromise = fetch(`${API_URL}/alpha?codes=${search}`, {});
                // Search by CURRENCY
                const searchByCurrencyPromise = fetch(`${API_URL}/currency/${search}`, {});
                // Search by LANGUAGE
                const searchByLanguagePromise = fetch(`${API_URL}/lang/${search}`, {});
                // Search by CAPITAL CITY
                const searchByCapitalPromise = fetch(`${API_URL}/capital/${search}`, {});
                // Search by CALLING CODE
                const searchByCallingCodePromise = fetch(`${API_URL}/callingcode/${search}`, {});
                // Search by CONTINENT
                const searchByContinentPromise = fetch(`${API_URL}/continent/${search}`, {});
                // Search by REGIONAL BLOC
                const searchByRegionalBlocPromise = fetch(`${API_URL}/regionalbloc/${search}`, {});
                
                const searchPromises = [];

                searchPromises.push(
                    searchByNamePromise,
                    searchByFullNamePromise,
                    searchByCodePromise,
                    searchByListOfCodesPromise,
                    searchByCurrencyPromise,
                    searchByLanguagePromise,
                    searchByCapitalPromise,
                    searchByCallingCodePromise,
                    searchByContinentPromise,
                    searchByRegionalBlocPromise
                    );

                const responses = await Promise.allSettled(searchPromises)
                const results = responses.flat();
                const successfullResults = results.filter(result => result.value.ok);

                const searchResults = await parseResponses(successfullResults);
            
                // maybe do this in the view ?! think about dropdown
                if(regionFilterCheck !== 'no-filter') {
                    const filteredResultsByRegion = filterByRegionCallback(searchResults, regionFilterCheck);
                    setCountries(filteredResultsByRegion);
                } else {
                    setCountries(searchResults);
                }
            }
        } catch(e) {
            console.log('Error! :', e);
        }       
    }

    const onRegionHandler = async (region) => {
        try {
           // on change if there is a searchterm we need to redo onSearchHandler with new filter
           if(searchTerm !== '') {
             await onSearchHandler(searchTerm ,region);
            
           } else {  // on change if no search term, do normal call
            //setIsLoading(true);
            const response = await fetch(`${API_URL}/continent/${region}`, {
            });
            //setIsLoading(false);               
            const data = await response.json();
            if(response.ok) {
                setCountries(data);
            } 
           }
       } catch (error) {
           console.log(`Error while fetching todos: ${error}`);
       }
    }

    return (    
        <>
            <div className=
                {theme ==='day' ? classes.header : `${classes.header} ${classes.darkHeader}` }
            >
                <div className={classes.headerTitle}>Where in the world?</div>
                <div onClick={toggleTheme}>{theme && theme === 'day' ? 'Dark Mode': 'Day Mode' }</div>
            </div>

            <div className=
            {theme ==='day' ? classes.wrapper : `${classes.wrapper} ${classes.dark}` } >
            {countryDetails ?  <CountryDetails 
                                    theme={theme}
                                    countryDetails={countryDetails}
                                    countryBorders={countryBorders}
                                    countryCardRemoveHandler={countryCardRemoveHandler} 
                                    countryCardClickHandler={countryCardClickHandler}
                                    
                            /> 
                        :
                <>
                    <div className={classes.filterContainer}>
                    <input className=
                        {theme ==='day' ? classes.searchInput : `${classes.searchInput} ${classes.lightDark} ${classes.darkSearchInput}` }
                        type="text" 
                        onChange={onInputChange} 
                        value={searchTerm} 
                    />
                    <select 
                        className=
                        {theme ==='day' ? classes.searchDropdown : `${classes.searchDropdown} ${classes.lightDark} ${classes.darkSearchInput}` }
                        name="filter-region" 
                        id="filter-region" 
                        onChange={onDropdownChange} 
                        value={regionFilter}
                    >
                        <option value="no-filter" defaultValue="no-filter">No Filter</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="oceania">Oceania</option>
                    </select>
                    </div>
                    <CountryList 
                        theme={theme}
                        countries={countries}
                        searchTerm={searchTerm}
                        countryCardClickHandler={countryCardClickHandler}
                    />
                </>
            }
        </div>
        </>
    );
}

export default Countries;