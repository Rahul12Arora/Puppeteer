import e from 'express';
const router = e.Router();
import fs from 'fs';
import path from 'path';
const filePath = './data.json';
const imageFolder = './images/';
import { overReacted } from "./scraperFunctionPup.js";
import internal from 'stream';

router.post('/new', async (req, res) => {
    // console.log('API hit');
    try {
        // console.log('req.query is', req.query);
        const url = req.query.url;

        if (!url) {
            console.error('URL is missing');
            return res.status(400).json({ error: 'URL is required' });
        }

        const dataToAppend = await overReacted(url);

        if (!dataToAppend) {
            console.error('No data to append');
            return res.status(400).json({ error: 'No data to append' });
        }

        // Read existing data from file
        let data = fs.readFileSync(filePath, 'utf8');
        // console.log('data is', data);

        let jsonData;

        // Try parsing the existing data
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }

        // Ensure jsonData is an array
        if (!Array.isArray(jsonData)) {
            console.error('Parsed data is not an array, resetting to empty array');
            jsonData = [];
        }

        // Add new data to the array
        jsonData.push(dataToAppend);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2)); // Pretty-print JSON

        // console.log('JSON data:', jsonData);
        res.status(201).json(jsonData);
    } catch (error) {
        console.error('Error appending data to file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/all', async (req, res) => {
    // console.log('api hit')
    try {
        // data was read from file
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);

        // Loop through the objects in jsonData
        for (const obj of jsonData) {
            const imagePath = path.join(imageFolder, `${obj.name}.png`);  // Construct image path dynamically

            // Check if image exists before reading
            if (fs.existsSync(imagePath)) {
                // Read image as base64 or buffer to include it in the response
                const imageData = fs.readFileSync(imagePath, 'base64');   // Reading image as base64 string

                obj.imageData = `data:image/png;base64,${imageData}`;      // Embedding the base64 image
            } else {
                // console.log(`Image not found for ${obj.name}`);
                obj.imageData = null;  // Handle case where image is not found
            }
        }
        res.status(201).json(jsonData);
    } catch (error) {
      console.error('Error getting data', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/deleteSelected', async (req, res) => {
    try {
        // console.log('req.query is ',typeof(req.query.srNosToDelete))

        let srNosToDelete = req.query.srNosToDelete.trim().split(',')

        srNosToDelete = srNosToDelete.map((el)=>{
            return parseInt(el)
        })

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            try {
                // Parse the JSON data
                const jsonData = JSON.parse(data);
        
                // Modify the array to remove the specified sr. no from each object's "sr. no" array
                // const updatedData = jsonData.map(item => {
                //     item['sr. no'] = item['sr. no'].filter(srNo => !srNosToDelete.includes(srNo));
                //     return item;
                // });
                const updatedData = jsonData.filter((item, i , arr) => {
                    return !srNosToDelete.includes(i+1)
                });
                // Write the updated data back to the JSON file
                fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing file:', writeErr);
                    } else {
                        console.log('Entries deleted successfully!');
                    }
                });
                return res.status(200).send(updatedData);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/newFromArray', async (req, res) => {
    // console.log('API hit');
    try {
        // console.log('req.body is', req.body);
        // res.status(200).send('ok')
        const urls = req.body.urls;
        for(const url of urls)
        {
        if (!url) {
            console.error('URL is missing');
            return res.status(400).json({ error: 'URL is required' });
        }

        const dataToAppend = await overReacted(url);

        if (!dataToAppend) {
            console.error('No data to append');
            return res.status(400).json({ error: 'No data to append' });
        }

        // Read existing data from file
        let data = fs.readFileSync(filePath, 'utf8');
        // console.log('data is', data);

        let jsonData;

        // Try parsing the existing data
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ error: 'Invalid JSON format' });
        }

        // Ensure jsonData is an array
        if (!Array.isArray(jsonData)) {
            console.error('Parsed data is not an array, resetting to empty array');
            jsonData = [];
        }

        // Add new data to the array
        jsonData.push(dataToAppend);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2)); // Pretty-print JSON

        // console.log('JSON data:', jsonData);
    }
        res.status(201).json('data added');
    } catch (error) {
        console.error('Error appending data to file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router; // Use export default
