


const CountryDetails = (props) => {
    console.log(props)
    const onBackHandler = () => {
        props.countryCardRemoveHandler();
    }

    return <div className="country">
            <div onClick={onBackHandler}>BACK</div>
            <p>{props.countryDetails.name}</p>
            <p>Flag: <img src={props.countryDetails.flag} alt={props.countryDetails.name} /></p>
            <p>Native name: {props.countryDetails.nativeName}</p>
            <p>Population: {props.countryDetails.population}</p>
            <p>Region: {props.countryDetails.region}</p>
            <p>Sub Region: {props.countryDetails.subregion}</p>
            <p>Capital: {props.countryDetails.capital}</p>
            <p>Top LevelDomain: {props.countryDetails.topLevelDomain && props.countryDetails.topLevelDomain.map(tld => <span>{tld}</span>)}</p>
            <p>Currencies: {props.countryDetails.currencies && props.countryDetails.currencies.map(currency => <span>{currency.name}</span>)}</p>
            <p>Langugaes: {props.countryDetails.languages && props.countryDetails.languages.map(language => <span>{language.name}</span>)}</p>

            <p>Border Countries: {props.countryDetails.borders && props.countryDetails.borders.map(border => <span>{border}</span>)}</p>
            </div>
}

export default CountryDetails;