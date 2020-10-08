require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 3000;
const dbConnection = `${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose
	.connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connected to database'))
	.catch((error) => console.log(`erro ao conectar ao mongo: ${error}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));
