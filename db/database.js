'use strict';

const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb://localhost:27017/authwithpassport';
/////////////////////////////////////////


/////////////////////////////////////////
//Set the mongoose promise library to the native Node.js library
mongoose.Promise = Promise;
/////////////////////////////////////////


/////////////////////////////////////////
//Export the connection to mongodb
module.exports.connect = () => mongoose.connect(MONGODB_URL);
module.exports.disconnect = () => mongoose.disconnect();
/////////////////////////////////////////
