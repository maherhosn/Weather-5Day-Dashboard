import express from 'express';
// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
import dotenv from 'dotenv';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 5432;

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
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
