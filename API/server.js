const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started');
});
