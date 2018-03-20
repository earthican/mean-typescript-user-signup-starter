import * as passport from 'passport';  
import * as passportLocal from 'passport-local';
import * as bcrypt from 'bcrypt';

import UserModel from '../models/User';

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  /**
   * Local Strategy login.
   * @param username Login using email as username
   * @param password Plaintext password of login request
   * @param done Passport.js done function
   */
  async (username, password, done) => {
    console.log('logging in...')
    const user = await UserModel.findOne({ email: username });
    if (user) {
      return bcrypt.compare(password, user.passwordHash, (err, isValid) => {
        if (err) return done(err)
        if (!isValid) return done(null, false)
        return done(null, user)
      })
    }
    return done(null, false)
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;  
