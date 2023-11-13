const app = require('./app');

const port = 3300;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
