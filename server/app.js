const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
cors = require('cors');
// const formidable = require('express-formidable');


const articlesRoutes = require('./routes/articles');
const userRoutes = require('./routes/user');

const app = express();

mongoose
    .connect(
        'mongodb+srv://william:'+
        process.env.MONGO_ATLAS_PW +
        '@cluster0-kmpkj.mongodb.net/node-angular'
    )
    .then(() => {
       console.log('Connected to database!');
    })
    .catch(() => {
       console.log('Connection failed!')
    });
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(formidable());


app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   res.setHeader(
       "Access-Control-Allow-Methods",
       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
   );
   next();
});

app.use('/api/articles', articlesRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
