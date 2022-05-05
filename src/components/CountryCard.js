import classes from "./CountryCard.module.css";
import countryClasses from "./Countries.module.css";

const CountryCard = (props) => {
    const countryCardOnClickHandler = (event) => {
        props.countryCardClickHandler(props.name);
    }
    return (
        <div className=
        {props.theme ==='day' ? classes.CountryCard : `${classes.CountryCard} ${classes.DarkCoutryCard}` }
        
            onClick={countryCardOnClickHandler}>
            <div className={`${classes.FlagContainer}`}>
                <img src={props.flag} alt={props.name} />
            </div>
            <div className=
            {props.theme ==='day' ? classes.CardContent : `${classes.CardContent} ${countryClasses.lightDark}` }
            >
                <h2>{props.name}</h2>
                <div><span className={classes.subtitle}>Population:</span> {props.population.toLocaleString()}</div>
                <div><span className={classes.subtitle}>Region:</span> {props.region}</div>
                <div><span className={classes.subtitle}>Capital:</span> {props.capital}</div>
            </div>
        </div>
    )
        
}

export default CountryCard;