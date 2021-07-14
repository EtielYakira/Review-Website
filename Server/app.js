const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const logger = require('morgan');
const mysql = require('mysql2');




const indexRouter = require('./routes/index');
const tagsRouter = require('./routes/tags');
const categoriesRouter = require('./routes/categories');
const usersRouter = require('./routes/users2');
const placesRouter = require('./routes/places2');
const galleryRouter = require('./routes/gallery');

const app = express();

const db = require("./models2/index2");
db.sequelize.sync();
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/places', placesRouter)
app.use('/tags', tagsRouter)
app.use('/categories', categoriesRouter)
app.use('/gallery', galleryRouter)


module.exports = app;
