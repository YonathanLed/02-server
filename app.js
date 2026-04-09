const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/about', (req, res) => {
  res.send("I'm Yonathan Lederman")
})

app.get('/api/time', (req, res) => {
  res.json({
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString()
  });
});

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.json({
    greeting: `Hello, ${name}!`
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get('/api/joke', async (req, res) => {
  try {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const joke = await response.json();
    res.json({ setup: joke.setup, punchline: joke.punchline });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch joke' });
  }
});