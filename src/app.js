require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

mongoose.Promise = global.Promise;

const dbConnection = process.env.MONGO_URL;

mongoose
	.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connected to database'))
	.catch((error) => console.log(`error connecting to Mongo: ${error}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', routes);

app.listen(process.env.PORT || 3000);
