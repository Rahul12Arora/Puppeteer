import dotenv from 'dotenv';
import express from 'express';
import routeFile from './routes.js';
import cors from 'cors';

dotenv.config();
const app = express();

// Enable CORS with options
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with the frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Specify allowed methods
    credentials: true                // Allow credentials (cookies, etc.)
};
app.use(cors())
const port = process.env.PORT || 5003;

app.use(express.json());
// Initialize routes
routeFile(app);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
