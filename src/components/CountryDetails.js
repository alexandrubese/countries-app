import classes from "./CountryDetails.module.css";

const CountryDetails = (props) => {
    const onBackHandler = () => {
        props.countryCardRemoveHandler();
    }

    const onClickHandler = (event) => {
        // bug for czech republic, try something else instead of name (maybe abbreviation)
        const countryName = event.target.innerText;
        props.countryCardClickHandler(countryName.trim());
    }

    return <div className="country">
        <div onClick={onBackHandler} className={classes.backBtn}>
            BACK
        </div>

            <div className={classes.countryDetailsWrapper}>
                <img className={classes.flag} src={props.countryDetails.flag} alt={props.countryDetails.name} />
                <div className={classes.infoContainer}>
                    <h2>{props.countryDetails.name}</h2>
                    <div className={classes.info}>
                        <div>
                            <p>Native name: {props.countryDetails.nativeName}</p>
                            <p>Population: {props.countryDetails.population.toLocaleString()}</p>
                            <p>Region: {props.countryDetails.region}</p>
                            <p>Sub Region: {props.countryDetails.subregion}</p>
                            <p>Capital: {props.countryDetails.capital}</p>
                        </div>

                        <div className={classes.column}>
                            <p>Top LevelDomain: {props.countryDetails.topLevelDomain && props.countryDetails.topLevelDomain.map(tld => <span key={tld}>{` ${tld} |`}</span>)}</p>
                            <p>Currencies: {props.countryDetails.currencies && props.countryDetails.currencies.map(currency => <span key={currency.name}>{` ${currency.name} |`}</span>)}</p>
                            <p>Languages: {props.countryDetails.languages && props.countryDetails.languages.map(language => <span key={language.name}>{` ${language.name} |`}</span>)}</p>

                            <p>Border Countries: {props.countryBorders && props.countryBorders.map(border => <span key={border.name} onClick={onClickHandler} className={classes.borderLink}>{` ${border.name} `}</span>)}</p>
                        </div>
                    </div>
                </div>

                
            </div>


        </div>
}

export default CountryDetails;