import { Router, type Request, type Response } from 'express';
// import weatherService from '../../service/weatherService';
// import historyService from '../../service/historyService';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  const { cityName } = req.body;
  if (req.body) {
    // TODO: GET weather data from city name
    WeatherService.getWeatherForCity(cityName);
    // TODO: save city to search history
    HistoryService.addCity(cityName);
    res.json(`The City was added to the history successfuly!`)
  } 
  else {
    res.send(`Error, Unable to add the city`)
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  console.info(`${req.method} get history of all the cities entered!`);
  HistoryService.getCities().then((data) => res.json(data));
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      res.status(400).json({ msg: 'City ID is required' });
    }
    await HistoryService.removeCity(req.params.id);
    res.json({ success: 'City successfully removed from search history' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export default router;
