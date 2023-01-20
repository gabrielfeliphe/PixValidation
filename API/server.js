const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pixkeyRoutes = require('./routes.js');

app.use(bodyParser.json());

app.use('/api', pixkeyRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
