'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./yaml-config.js')('./service.config.yml');

const app = express();

/*app.use(function (request, response, next) {
  console.log(response);
  next();
});*/
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/query', require('./routes/query.js'));

app.listen(config.service.port, () => {
  console.log(`http://localhost:${config.service.port}/`);
});