require('dotenv').config();
require('@babel/register');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);

const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/auth');
const roomsRouter = require('./src/routes/rooms');

const app = express();
const PORT = 6788;

const sessionConfig = {
  name: 'UserAuth',
  store: new FileStore(),
  secret: process.env.COOKIE_SEKRET, 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 60 * 24 * 1000, 
    httpOnly: false,
  },
};

app.use(expressSession(sessionConfig));
app.use(cors({ credentials: true, origin: true }));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter)
app.use('/auth', authRouter);
app.use('/rooms', roomsRouter);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});