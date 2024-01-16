import axios from 'axios';



const apiService = {
    searchCountries: async (value) => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/name/${value}`);
        return response.data.map((countryData) => ({
          name: countryData.name.common,
          capital: countryData.capital,
          area: countryData.area,
          languages: countryData.languages,
          flags: countryData.flags,
          capitalinfo: countryData.capitalinfo,
          latLng: countryData.latlng,
        }));
      } catch (error) {
        console.error('Error fetching country data:', error);
        return [];
      }
    },
  };
  
  export default apiService;
