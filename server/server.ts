import 'reflect-metadata';
import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as expressJwt from 'express-jwt';

import passport from './auth/passport';
import db from './db/middleware';
import auth from './auth/middleware';

// Creates and configures an ExpressJS web server.
class Server {

  // ref to Express instance
  public express: express.Application;

  private authenticate: expressJwt.RequestHandler;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.authenticate = expressJwt({secret : 'server secret'});
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(passport.initialize());
    this.express.use(express.static(path.join(__dirname, '../dist/app/')));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('/', (req, res, next) => {
      res.sendFile(path.join(__dirname, '../dist/app/index.html'));
    });

    this.express.post('/signup',
      db.getOrCreateUser,
      auth.generateToken,
      auth.respond
    );

    this.express.post('/login',
      passport.authenticate('local'),
      auth.serialize,
      auth.generateToken,
      auth.respond
    );

    this.express.use('/', router);
  }

}

export default new Server().express;
