'use strict';

const express = require('express');
const app = express();
const routes = require('./routes/');
/////////////////////////////////////////


/////////////////////////////////////////
//Middle ware
app.set('views', 'templates');
app.set('view engine', 'pug');
app.use(express.static('public'));
/////////////////////////////////////////


/////////////////////////////////////////
//Routes
app.use(routes);
/////////////////////////////////////////


/////////////////////////////////////////
app.listen(3000, () => console.log("Listening on port 3000"));
/////////////////////////////////////////
