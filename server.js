const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pixkeyRoutes = require('./routes.js');

app.use(bodyParser.json());

app.use('/api', pixkeyRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
