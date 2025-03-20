const express = require ('express');
const path = require ('path');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const passport = require ('passport');
const mongoose = require ('mongoose');
const config = require ('./config/database');

// Database connection 
mongoose.connect(config.database);
// On connection
mongoose.connection.on('connected',()=>{
    console.log('Connected on database'+ config.database);
})
// On error
mongoose.connection.on('error', (error)=>{
    console.log('Database error' + error)
})


const app = express ();

const users= require("./routes/users");

// Middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Index route
app.get('/', (req, res) => {
  res.send('Invalid Express endpoint');
});



app.use('/users', users);

// App export
module.exports = app;