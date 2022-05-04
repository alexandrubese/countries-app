import CountryCard from "./CountryCard";
import classes from "./CountryList.module.css";

const CountryList = (props) => {
    return (    
        <div className={`${classes.CountryList}`}>
            { /*props.countries.filter(country => {
                if (props.searchTerm === '') {
                    return country;
                } else if (country.name.toLowerCase().includes(props.searchTerm.toLowerCase())) {
                    return country;
                } else {
                    return false;
                }
                })*/
                props.countries.map(country => {
                return <CountryCard
                            key={country.numericCode}
                            flag={country.flag}
                            name={country.name}
                            population={country.population}
                            capital={country.capital}
                            region={country.region}
                        />
                }
            )}
        </div>
    );
}

export default CountryList;