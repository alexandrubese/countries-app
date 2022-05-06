import CountryCard from "./CountryCard";
import classes from "./CountryList.module.css";

const CountryList = (props) => {
    return (    
        <div className={`${classes.CountryList}`}>
            { props.countries.length === 0 ? 'No countries found': ''}
            { props.countries.map(country => {
                return <CountryCard
                            key={country.numericCode}
                            flag={country.flag}
                            name={country.name}
                            population={country.population}
                            capital={country.capital}
                            region={country.region}
                            theme={props.theme}
                            countryCardClickHandler={props.countryCardClickHandler}
                        />
                }
            )}
        </div>
    );
}

export default CountryList;