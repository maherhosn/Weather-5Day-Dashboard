import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const port = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
// TODO: Implement middleware for parsing JSON and urlencoded form data
// TODO: Implement middleware to connect the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../../client/dist'));
app.use(routes);

// // This route is a GET route for the home page
// app.get('/', (_req: Request, res: Response) => {
//     res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
//   });
  

// Start the server on the port
app.listen(port, () => console.log(`Listening on PORT: ${port}`));
