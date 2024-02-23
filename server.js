const express = require('express');
const app = express();

app.get('/dynamic', (req, res) => {
  const { a, b, c } = req.query;

  if (a == null && isNaN(a) || b == null && isNaN(b) || c == null && isNaN(c)) {
    res.json({ header: 'Error' });
    return;
  }
  else {
    const result = (a * b * c) / 3;
    res.json({ header: 'Calculated', body: result.toString() });
  }
});

app.get('/static', (req, res) => {
  res.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
});

app.listen(3000);