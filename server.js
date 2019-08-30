const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./Routes/api/items');


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//Db Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
.connect(db)
.then(() => console.log("connect"))
.catch(err => console.log(err));

//Use Routes
app.use('/api/items', items)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));
