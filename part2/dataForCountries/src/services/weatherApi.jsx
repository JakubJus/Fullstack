import axios from 'axios';

const apiKey = 'a780264a384722c51d7f2c03ca07fd82';

const weatherApi = {
  getWeather: async ( latitude,longitude) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      //console.log(response.data.weather[0].icon);
      return {
        temp: response.data.main.temp - 272.15,
        icon: response.data.weather[0].icon,
        windspeed: response.data.wind.speed,
      };
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  },
};

export default weatherApi;