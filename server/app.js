const express = require('express');
const cors = require('cors');
const path = require('path');
const { gameRoutes } = require('./routes/api/game');
const { logRoutes } = require('./routes/api/log');

const app = express();

const publicPath = path.join(__dirname, 'public');

app.use(cors());
app.use(express.json());

app.use(express.static(publicPath));

app.get('/', (_, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.use('/api/game',gameRoutes)
app.use('/api/logging',logRoutes)

app.all('*', (_, res) => {
  res.status(404).json({ message: 'app. Resourse not found ...' });
});

app.use((err, _, res, __) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
