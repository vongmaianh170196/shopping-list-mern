const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

//Bodyparser Middleware
app.use(express.json());

//Db Config
const db = config.get('mongoURI');

//Connect to Mongo
mongoose
.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => console.log("connect"))
.catch(err => console.log(err));

//Use Routes
app.use('/api/items', require('./Routes/api/items'))
app.use('/api/users', require('./Routes/api/users'))
app.use('/api/auth', require('./Routes/api/auth'))

//Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    });
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));
