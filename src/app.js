const express = require('express');
const cors = require('cors');
const { router } = require('../src/routes/router');
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});