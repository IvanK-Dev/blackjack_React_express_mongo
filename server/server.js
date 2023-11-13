const app = require('./app');
require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');

const port = process.env.PORT || 3300;

mongoose
  .connect(process.env.DB_PATH)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(() => {
    console.log(`Can't connect to DB `);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
