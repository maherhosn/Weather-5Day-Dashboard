import dotenv from 'dotenv';
// import { v4 as uuidv4 } from 'uuid';
// import historyService from './historyService';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   city: string;
//   date: number;
//   icon: string;
//   iconDescription: string;
//   temprature: number;
//   wind: number;
//   humidity: number;
// }

// const date = new Date(172930680000 * 10);
// // British English uses day-month-year order and 24-hour time without AM/PM
// console.log(date.toDateString());

// TODO: Define a class for the Weather object
// class Weather {
//   // city
//   // today's date
//   // 5 day date forecast after today's date
//   // icon of the weather forecast
//   // Temprature for each day
//   // Wind speed for each day
//   // Humidity for each day
//   name: string;
//   dt_txt: number;
//   icon: string;
//   description: string;
//   temp: number;
//   windSpeed: number;
//   humidity: number;

//   constructor(city: string, date: number, icon: string, iconDescription: string, temprature: number, wind: number, humidity: number) {
//     this.name = city;
//     this.dt_txt = date;
//     this.icon = icon;
//     this.description = iconDescription;
//     this.temp = temprature;
//     this.windSpeed = wind;
//     this.humidity = humidity;
//   }
// }

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
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/forecast?q=${query},us&appid=${this.apiKey}`
      );

      const locationDetails = await response.json();


      return locationDetails;
    } catch (err) {
      console.log('Error:', err);
      return err;
    }
  }

  // // TODO: Create destructureLocationData method
  // private destructureLocationData(location: Coordinates): Coordinates {
  //   const locationObject: Coordinates = {
  //     name: location.name,
  //     lat: location.lat,
  //     lon: location.lon,
  //     country: location.country,
  //     state: location.state
  //   };
  //   return locationObject;
  // }
  // // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {
  //   try {
  //     const response = await fetch(
  //       //https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
  //       `${this.baseURL}/1.0/direct?q=${query}&api_key=${this.apiKey}`
  //     );

  //     const locationDetails = await response.json();
  //     console.log(locationDetails);


  //     const mappedLocation = this.destructureLocationData(locationDetails);
  //     return mappedLocation;
  //   } catch (err) {
  //     console.log('Error:', err);
  //     return err;
  //   }
  // }
  // // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {


  // }
  // // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() { }
  // // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) { }
  // // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) { }
  // // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  //   const forecastArray = [];

  //   // Assuming weatherData contains daily forecasts
  //   for (const day of weatherData) {
  //       const forecast = {
  //           date: day.dt_txt, // The date/time of the forecast
  //           temperature: day.main.temp, // Temperature for the day
  //           humidity: day.main.humidity, // Humidity for the day
  //           windSpeed: day.wind.speed, // Wind speed for the day
  //           description: day.weather[0].description, // Weather description
  //           icon: day.weather[0].icon // Weather icon
  //       };
  //       forecastArray.push(forecast);
  //   }

  //   // Optionally, you can include the current weather as the first item in the array
  //   forecastArray.unshift({
  //       date: currentWeather.dt_txt,
  //       temperature: currentWeather.temp,
  //       humidity: currentWeather.humidity,
  //       windSpeed: currentWeather.windSpeed,
  //       description: currentWeather.description,
  //       icon: currentWeather.icon
  //   });

  //   return forecastArray;

  // }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    //try {
      const weatherForecast = await this.fetchLocationData(city);

      if(weatherForecast){
        // let cityName =weatherForecast.city.name;
        // this.date = date;
        // this.icon = icon;
        // this.iconDescription = iconDescription;
        // this.temprature = temprature;
        // this.wind = wind;
        // this.humidity = humidity; 
        // const mappedLocation = this.destructureLocationData(weatherForecast);
        console.log(weatherForecast.list[0].main);
      }

      //}
      //catch{

      //}
    };

}

export default new WeatherService();
