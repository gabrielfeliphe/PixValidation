const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const pixkeyRouter = require('./routes');

app.use(bodyParser.json());

app.use('/api', pixkeyRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
