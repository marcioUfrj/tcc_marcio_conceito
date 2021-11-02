const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  // funcao para autenticar o usuario
  const authenticateUser = async (email, password, done) => {
    let user
    try {
      user = await getUserByEmail(email)
      //console.log('dentro do try do bcrypt. Password from DB: ' + user)
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect'})
      }
    } catch(e) {
      if (user == null) {
        // @params1 = error on the server
        return done(null, false, { message: 'No user with that email'})
      }
      return done(e)
    }
  }

  // funcao executada para retornar o DONE() ao tentar consultar o _id do user
  const execGetUserById = async (id, done) => {
    let user
    try {
      user = await getUserById(id)
      return done(null, user)}
    catch (e) {
      if (user == null) {
        done(null, false, { message: 'No user with that id'})
      }
      return done(e)
    }
  }

  passport.use(new LocalStrategy( { usernameField: 'email'}, authenticateUser))
  passport.serializeUser((user, done) => { return done(null, user.id) })
  passport.deserializeUser(async (id, done) => { return await execGetUserById(id, done) })
}

module.exports = initialize