import classes from "./CountryDetails.module.css";

const CountryDetails = (props) => {
    console.log(props)
    const onBackHandler = () => {
        props.countryCardRemoveHandler();
    }

    return <div className="country">
        <div onClick={onBackHandler} className={classes.backBtn}>
            BACK
        </div>

            <div className={classes.countryDetailsWrapper}>
                <img className={classes.flag} src={props.countryDetails.flag} alt={props.countryDetails.name} />

                <div className={classes.infoContainer}>
                    <div>{props.countryDetails.name}</div>
                    <div className={classes.info}>
                        <div>
                            <p>Native name: {props.countryDetails.nativeName}</p>
                            <p>Population: {props.countryDetails.population}</p>
                            <p>Region: {props.countryDetails.region}</p>
                            <p>Sub Region: {props.countryDetails.subregion}</p>
                            <p>Capital: {props.countryDetails.capital}</p>
                        </div>

                        <div className={classes.column}>
                            <p>Top LevelDomain: {props.countryDetails.topLevelDomain && props.countryDetails.topLevelDomain.map(tld => <span>{tld}</span>)}</p>
                            <p>Currencies: {props.countryDetails.currencies && props.countryDetails.currencies.map(currency => <span>{currency.name}</span>)}</p>
                            <p>Langugaes: {props.countryDetails.languages && props.countryDetails.languages.map(language => <span>{language.name}</span>)}</p>

                            <p>Border Countries: {props.countryDetails.borders && props.countryDetails.borders.map(border => <span>{border}</span>)}</p>
                        </div>
                    </div>
                </div>

                
            </div>


        </div>
}

export default CountryDetails;