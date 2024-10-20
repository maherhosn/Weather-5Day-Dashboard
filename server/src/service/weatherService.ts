import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
export interface Coordinates {
  lat: number;  // Latitude
  lon: number;  // Longitude
}


//TODO: Define a class for the Weather object
export class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;


  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;

  private apiKey?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
  }

  // TODO: Create fetchLocationData method
  private async fetchWeatherData(query: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/forecast?q=${query},us&appid=${this.apiKey}&units=imperial`
      );
      const weatherDetails = await response.json();


      return weatherDetails;
    } catch (err) {
      console.log('Error in the page /Service/WeatherService.ts under the funcion: fetchWeatherData', err);
      return err;
    }
  }

  // TODO: Build parseCurrentWeather method
  // This method is to get today's current weather!
  private parseCurrentWeather(response: any) {

    const city = response.city.name;

    let checkDate = new Date(response.city.sunrise * 1000);
    const date = checkDate.toDateString();

    const tempF = response.list[0].main.temp;

    const humidity = response.list[0].main.humidity;

    const windSpeed = response.list[0].wind.speed;

    const iconDescription = response.list[0].weather[0].description;

    const icon = response.list[0].weather[0].icon;

    const currentWeather: Weather = {
      city,
      date,
      icon,
      iconDescription,
      tempF,
      windSpeed,
      humidity
    }


    return currentWeather;
  }


  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any) {
    const forecastArray = [];

    //The 5 day weather forecast returns 40 values, 8 readable value per day... 
    // Only get and transcribe the weather/day at 3 pm. 
    for (let i = 4; i < weatherData.list.length; i += 8) {
      const city = weatherData.city.name;

      //Translate the Time of data forecasted, unix, UTC to string readable format 
      let checkDate = new Date(weatherData.list[i].dt * 1000);
      const date = checkDate.toDateString();

      const tempF = weatherData.list[i].main.temp;

      const humidity = weatherData.list[i].main.humidity;

      const windSpeed = weatherData.list[i].wind.speed;

      const iconDescription = weatherData.list[i].weather[0].description;

      const icon = weatherData.list[i].weather[0].icon;

      const dayWeather: Weather = {
        city,
        date,
        icon,
        iconDescription,
        tempF,
        windSpeed,
        humidity
      }
      forecastArray.push(dayWeather);
    }

    // Make sure the first value in the Weather array is the current weather for the city!
    forecastArray.unshift({
      city: currentWeather.city,
      date: currentWeather.date,
      icon: currentWeather.icon,
      iconDescription: currentWeather.iconDescription,
      tempF: currentWeather.tempF,
      windSpeed: currentWeather.windSpeed,
      humidity: currentWeather.humidity
    });

    return forecastArray;
  }


  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    let fiveDayWeather:Weather[];
    if (!city) {
      throw new Error('City can not be blank');
    }

    try{
      const weatherForecast = await this.fetchWeatherData(city);
      const weatherToday = this.parseCurrentWeather(weatherForecast);
      fiveDayWeather = this.buildForecastArray(weatherToday, weatherForecast);
    }
    catch (err){
      fiveDayWeather=[];
    }
    return fiveDayWeather;
  };

}

export default new WeatherService();
