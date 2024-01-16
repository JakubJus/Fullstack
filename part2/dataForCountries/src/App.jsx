import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import CountryDetails from './components/CountryDetails';
import apiService from './services/apiService';
import weatherApi from './services/weatherApi';

const App = () => {
  const [value, setValue] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (value) {
      apiService.searchCountries(value).then((countries) => {
        if (countries.length > 1) {
          setCountryList(countries);
          setSuggestions(countries.map((country) => country.name));
        } else if (countries.length === 1) {
          setCountryList(countries.map(country => ({ ...country, weather: null })));
          setSuggestions([]);
          const [latitude, longitude] = countries[0].latLng;
          weatherApi.getWeather(latitude, longitude)
            .then(weatherData => {
              setCountryList([{
                ...countries[0],
                weather: weatherData
              }]);
            });
        } else {
          setCountryList([]);
          setSuggestions([]);
        }
      });
    }
  }, [value]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue && countryList.length === 5) {
      setSuggestions(countryList.map((country) => country.name));
    } else {
      setSuggestions([]);
    }
  };

  const onSearch = (event) => {
    event.preventDefault();
    setCountryList([]);
    setSuggestions([]);
    setValue(value.toLowerCase());
  };

  const handleSuggestionClick = (suggestion) => {
    setValue(suggestion);
    setCountryList([]);
    setSuggestions([]);
  };

  return (
    <div>
      <SearchForm
        value={value}
        handleChange={handleChange}
        onSearch={onSearch}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
      />
      {countryList.length === 1 && <CountryDetails country={countryList[0]} />}
    </div>
  );
};

export default App;
