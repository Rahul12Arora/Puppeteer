import dotenv from 'dotenv';
import express from 'express';
import routeFile from './routes.js';

dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5003;

// Initialize routes
routeFile(app);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
