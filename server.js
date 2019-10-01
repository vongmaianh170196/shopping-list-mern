const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
    
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

//Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ${port}'));
