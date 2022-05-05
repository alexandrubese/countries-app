import classes from "./CountryCard.module.css";

const CountryCard = (props) => {
    const countryCardOnClickHandler = (event) => {
        props.countryCardClickHandler(props.name);
    }
    return (
        <div className={`${classes.CountryCard}`} onClick={countryCardOnClickHandler}>
            <div className={`${classes.FlagContainer}`}>
                <img src={props.flag} alt={props.name} />
            </div>
            <div className={`${classes.CardContent}`}>
                <h2>{props.name}</h2>
                <div><b>Population:</b> {props.population.toLocaleString()}</div>
                <div><b>Region:</b> {props.region}</div>
                <div><b>Capital:</b> {props.capital}</div>
            </div>
        </div>
    )
        
}

export default CountryCard;