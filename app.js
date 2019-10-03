const express = require('express');
const expressLayouts = require('express-ejs-layouts'); 
const mongoose = require('mongoose');

const app = express();

//DB config
require('dotenv').config(); //for setting environment variables on server
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true ,useUnifiedTopology: true})
    .then(() => console.log("mongodb connected"))
    .catch(err => console.log(err));


//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));


