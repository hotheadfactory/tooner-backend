var JsonStrategy = require("passport-json").Strategy;
//TODO: Sequelize 적용하기
const mysql = require('mysql');
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;
const dbconfig = require('./dbconfig');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use (
        'local-signup',
        new JsonStrategy({
            usernameProp : 'username',
            passwordProp : 'password',
            passReqToCallback : true
        },
        function(req, username ,password, done) {
            connection.query("SELECT * FROM users WHERE username = ? ",
            [username], function(err, rows) {
                if(err)
                    return done(err);
                if(rows.length) {
                    return done(null, false);
                }else{
                    const salt = bcrypt.genSaltSync(saltRounds);
                    var newUserMysql = {
                        username : username,
                        password : bcrypt.hashSync(password, salt),
                    };
                    var insertQuery = "INSERT INTO users (username, password) values (?, ?)"

                    connection.query(insertQuery, [newUserMysql.username, newUserMysql.password],
                        function(err, rows) {
                            newUserMysql.id = rows.insertId;
                            return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new JsonStrategy({
            usernameProp : 'username',
            passwordProp : 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ?", [username],
            function(err, rows) {
                if(err) {
                    console.error(err);
                    return done(err);
                }
                if(!rows.length || !bcrypt.compareSync(password, rows[0].password)) {
                    return done(null, false);
                }
                return done(null, rows[0]);
            });
        })
    );
};
