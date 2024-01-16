import React from 'react';

const CountryDetails = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    {country.capital && <p>Capital: {country.capital}</p>}
    {country.area && <p>Area: {country.area}</p>}
    <br/>
    <h3>Languages</h3>
    {country.languages && (
    <ul>
    {Object.entries(country.languages).map(([code, language], index) => (
      <li key={index}>{`${language}`}</li>
    ))}
    </ul>
    )}
    {country.flags && (
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name}`}
        style={{ width: '100px', height: 'auto' }}
      />
    )}
     {country.weather && (
      <div>
        <h3>Weather in {country.capital}:</h3>
        <p>Temperature: {country.weather.temp.toFixed(2)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${country.weather.icon}@2x.png`}
            alt={`Weather icon for ${country.name}`}
            style={{ width: '50px', height: '50px' }}
          />
       <p>Windspeed: {country.weather.windspeed} m/s</p>
      </div>
    )}
  </div>
);

export default CountryDetails;
