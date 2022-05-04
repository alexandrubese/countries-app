import { useEffect, useState } from "react";
import { API_URL } from "../utils/consts";
import CountryFilters from "./CountryFilters";
import CountryList from "./CountryList";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    const getCountries = async () => {
        try {
             //setIsLoading(true);
            const response = await fetch(`${API_URL}/all`, {
         });
            //setIsLoading(false);               
            const data = await response.json();
            if(response.ok) {
               setCountries(data);
            } 
        } catch (error) {
            console.log(`Error while fetching todos: ${error}`);
        }
    }

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

    const onSearchHandler = async (search) => {
        try {
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
            setCountries(searchResults);
            }
        } catch(e) {
            console.log('Error! :', e);
        }       
    }

    const onRegionHandler = async (region) => {
        try {
            //setIsLoading(true);
           const response = await fetch(`${API_URL}/continent/${region}`, {
        });
           //setIsLoading(false);               
           const data = await response.json();
           if(response.ok) {
              setCountries(data);
           } 
       } catch (error) {
           console.log(`Error while fetching todos: ${error}`);
       }
    }

    return (    
        <>
            <CountryFilters 
                onSearchHandler={onSearchHandler}
                onRegionHandler={onRegionHandler} 
            />
            <CountryList 
                countries={countries}
                searchTerm={searchTerm}
            />
        </>
    );
}

export default Countries;