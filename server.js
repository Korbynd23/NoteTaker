const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const util = require('util')
const readFile = util.promisify(fs.readFile)
const htmlRoutes = require('./routes/html')
const apiRoutes = require('./routes/api')

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

app.use('/', htmlRoutes)

app.use('/', apiRoutes)
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

