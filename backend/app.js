/**
 * tooner api server
 * (c) 2019-2020 정회형 
 * https://hotheadfactory.com
 */

const express = require('express');
var session = require('express-session');
const app = express();
var cors = require('cors');
const morgan = require('morgan');
var mysql = require('mysql');
const passport = require('passport');
var dbconfig = require('./config/dbconfig');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');


const PORT = 2599;

require('./config/passport')(passport, mysql, dbconfig);

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());


// TODO: 보안 향상을 위해 secret 바꾸기
app.use(session({
    secret: 'justasecret',
    resave: true,
    saveUninitialized: true
   }));

// 로깅 모듈 
app.use(morgan('combined'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, passport);

app.listen(PORT, function() {
    console.log("Tooner Beta\n==============================================\nTooner Since 2019! Server is on at port "+PORT+"......\n==============================================");
})