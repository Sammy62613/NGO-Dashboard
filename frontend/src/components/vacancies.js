const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Model = require('./ngo');

// Set up MongoDB Atlas URI and database name
const MONGODB_URI = 'mongodb+srv://xmoonfieldx:moon@cluster0.ndigt.mongodb.net/?retryWrites=true&w=majority';
const DB_NAME = 'ngo';

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: DB_NAME,
}).then(() => {
  console.log('MongoDB Atlas database connected successfully!');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas database:', error);
});

// Use the find method to get all documents
app.get('/ngos/with-vacancies', (req, res) => {
  const query = {"availability": "Yes"};
  const projection = {"_id": 0 };
  Model.find(query, projection)
    .then(docs => {
      // Create an array to hold NGO names
      const ngoNames = [];
      // Iterate over the results and add the name field for each document to the ngoNames array
      docs.forEach(doc => {
        const ngoName = doc.name;
        console.log('NGO Name:', ngoName);
        ngoNames.push(ngoName);
      });
      // Send the ngoNames array as a JSON response
      res.status(200).json({ "Number of NGOs": ngoNames.length, "NGO Names": ngoNames });
    })
    .catch(err => {
      console.error('Error querying the students collection:', err);
      res.status(500).send('Error querying the students collection');
    });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
