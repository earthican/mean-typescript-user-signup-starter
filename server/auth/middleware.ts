import * as jwt from 'jsonwebtoken';

const auth = {

  /**
   * Serializes the user by representing
   * the user just by its ID.
   */
  serialize: (req, res, next) => {
    const userId = req.user.id;
    req.user = {
        id: userId
    };
    next();
  },

  /**
   * Generate a JSON Web Token to use for
   * authenticating requests.
   */
  generateToken: (req, res, next) => {  
    req.token = jwt.sign({
      id: req.user.id,
    }, 'server secret', {
      expiresIn: 1
    });
    next();
  },

  /**
   * Respond with the user and its token.
   */
  respond: (req, res) => {
    res.status(200).json({
      user: req.user,
      token: req.token
    });
  }, 
}

export default auth;
