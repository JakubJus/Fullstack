import React from 'react';

const SearchForm = ({ value, handleChange, onSearch, suggestions, handleSuggestionClick }) => (
  <div>
    <form onSubmit={onSearch}>
      Country: <input value={value} onChange={handleChange} />
      
    </form>
    {suggestions.length < 10 ? (
      <div>
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}<button type="submit">Show</button>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <p>{suggestions.length > 0 ? 'Please specify' : 'No results found'}</p>
    )}
  </div>
);

export default SearchForm;
