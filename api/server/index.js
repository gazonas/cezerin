var expressJwt = require('express-jwt');
var express = require('express');
var apiRouter = express.Router();

var settings = require('./lib/settings');
var auth = require('./lib/auth');
var mongo = require('./lib/mongo');
var utils = require('./lib/utils');

const СategoriesController = require('./controllers/products/categories');
const ProductsController = require('./controllers/products/products');
const SitemapController = require('./controllers/sitemap');

apiRouter.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization');
  next();
});

apiRouter.use(expressJwt({ secret: settings.security.jwtSecret}).unless({path: ['/api/authorize']}));
apiRouter.post('/authorize', auth.login);

var cat = new СategoriesController(apiRouter);
var prod = new ProductsController(apiRouter);
var sitemap = new SitemapController(apiRouter);

apiRouter.use(function(err, req, res, next) {
  if(err && err.name === 'UnauthorizedError') {
    res.status(401).send({ 'error': err.message });
  } else if(err) {
    res.status(500).send({ 'error': err });
  } else {
    next();
  }
});

mongo.connect(() => {});

module.exports = apiRouter;
