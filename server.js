const express = require('express');
const app = express();

app.get('/dynamic', (req, res) => {
    const { a, b, c } = req.query;

  if (a === undefined || b === undefined || c === undefined) {
    res.json({ header: 'Error' });
    return;
  }

  const result = (a * b * c) / 3;
  res.json({ header: 'Calculated', body: result.toString() });
});

app.get('/static', (req, res) => {
  res.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
});

app.listen(3000);