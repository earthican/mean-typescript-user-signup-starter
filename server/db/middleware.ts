import * as bcrypt from 'bcrypt';

import UserModel from '../models/User';

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

const db = {
  getOrCreateUser: async (req, res, next) => {
    const body = req.body;
    let user = await UserModel.findOne({ email: body.email });
    if (!user) {
      console.log(`Could not find user with email ${body.email}. ` +
        'Creating new user.');

      user = new UserModel(req.body);
      user.passwordHash = bcrypt.hashSync(body.password, salt);
      await user.save();
      console.log('New user saved.');
    }

    req.user = user;
    next();
  }
}

export default db;
