const passport = require('passport');
const LocalStrategy = require('passport-local')
const GithubStrategy = require('passport-github2');
const { UserManager } = require('../Controllers/UserManager');
const bcrypt = require('bcrypt');

function initPassportLocal() {
    passport.use('sign-up', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (request, username, password, done) => {
        try {
            const user = await UserManager.getUser(username)
            if (user) return done(null, false)
            let newUser = await UserManager.createUser({ user: username, password: password })
            return done(null, newUser)
        } catch (error) {

        }
    }))

    passport.use('sign-in', new LocalStrategy({
        usernameField: 'user'
    }, async (username, password, done) => {
        const usr = await UserManager.getUser(username)
        try {
            if (!usr) return done(null, false)
            if (!bcrypt.compareSync(password, usr.password)) return done(null, false)

            return done(null, usr)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await UserManager.getUser(profile._json.email)
            if (!user) {
                const newUser = await UserManager.createGithubUser(profile._json.email)
                return done(null, newUser)
            } else {
                return done(null, user)
            }
        } catch (error) {
            return done(error)
        }

    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await UserManager.getSpecificUser({ _id: id })
        done(null, user)
    })
}

module.exports = { initPassportLocal }