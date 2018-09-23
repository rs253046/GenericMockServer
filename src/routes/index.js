import config from '../../config/environment';
import exphbs from 'express-handlebars';
import express from 'express';
import userRoute from './users/userRoute';
import chalk from 'chalk';

class Routes {
  constructor() { }

  configureExpress(app) {
    const configureExphbs = exphbs({
      extname: '.hbs',
      defaultLayout: 'default',
      layoutsDir: config.paths.defaultLayoutDirectory
    });

    app.engine('.hbs', configureExphbs);
    app.set('view engine', '.hbs');
    app.set('views', config.paths.viewsDirectory);
  }

  configureMiddlewares(app) {
    app.use(express.json({
      limit: '50mb'
    }));
    app.use(express.static(__dirname + '/public'));


    app.use(function (err, req, res, next) {
      console.error(err.stack);
      res.send(500, { message: err.message });
    });

    app.use(function (req, res, next) {
      console.log(chalk.yellow('Time: ' + Date.now() + ' ' + 'Route: ' +  req.url));
      next()
    });


    // Handle any routes that are unhandled and return 404


    // app.use(function( req, res, next) {
    //   console.log(res);
    //   if (res.status === 404) {
    //     const err = new Error('Not Found');
    //     err.status = 404;
    //     res.render('errors/404', err);
    //   }
    //   next();
    // });
  }

  configureCors(app) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Cache-Control, Content-Type, Accept, authorization, Pragma, contentType");
      next();
    });
  }

  create(app, db, ioSocket) {
    app.use(this.resolveRoute('/user'), userRoute(db));
  }

  resolveRoute(route) {
    return config.namespace + route;
  }
}

export default new Routes();
