import config from '../../config/environment';
import exphbs from 'express-handlebars';
import express from 'express';
import userRoute from './users/userRoute';
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

    //Handle any routes that are unhandled and return 404
    // app.use(function(req, res, next) {
    //   const err = new Error('Not Found');
    //   err.status = 404;
    //   res.render('errors/404', err);
    // });
  }

  configureCors(app) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Cache-Control, Content-Type, Accept, authorization, Pragma");
      next();
    });
  }

  create(app, db, ioSocket) {
    app.use('/user', userRoute(db));
  }
}

export default new Routes();