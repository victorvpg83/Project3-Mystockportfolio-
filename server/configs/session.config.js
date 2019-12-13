const passport = require('passport')
const session = require('express-session')
require('./passport.config')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

module.exports = app => {
    // Configuración de sesión
    app.use(session({
        secret: 'Whatever',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }))
    app.use(passport.initialize())
    app.use(passport.session())
}