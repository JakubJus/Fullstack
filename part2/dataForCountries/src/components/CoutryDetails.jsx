import React from 'react';

const CountryDetails = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    {country.capital && <p>Capital: {country.capital}</p>}
    {country.area && <p>Area: {country.area}</p>}
    <br />
    <h3>Languages</h3>
    {country.languages && <p>{Object.values(country.languages).join(', ')}</p>}
    {country.flags && (
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name}`}
        style={{ width: '100px', height: 'auto' }}
      />
    )}
  </div>
);

export default CountryDetails;
