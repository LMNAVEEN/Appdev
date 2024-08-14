// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 7000;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/payment', (req, res) => {
  const data = req.body;
  const id = Date.now(); // Unique ID based on timestamp

  data.id = id; // Assign unique ID to the data

  fs.readFile('payments.json', (err, fileData) => {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    const payments = fileData ? JSON.parse(fileData) : [];
    payments.push(data);

    fs.writeFile('payments.json', JSON.stringify(payments, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save data' });
      }
      res.status(200).json({ message: 'Payment saved successfully!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
