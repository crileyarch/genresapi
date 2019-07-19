const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const morgan = require('morgan');
const startupDebugger = require('debug')('app:startup');
//const dbDebugger = require('debug')('app:db');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

app.use('/api/genres', genres);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Database Server Name: ' + config.get('database.host'));


if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//Db debugging
//dbDebugger('Connected to the database...');

// Environment variable for Port
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}....`));