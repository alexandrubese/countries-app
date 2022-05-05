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
                <div><span className={classes.subtitle}>Population:</span> {props.population.toLocaleString()}</div>
                <div><span className={classes.subtitle}>Region:</span> {props.region}</div>
                <div><span className={classes.subtitle}>Capital:</span> {props.capital}</div>
            </div>
        </div>
    )
        
}

export default CountryCard;