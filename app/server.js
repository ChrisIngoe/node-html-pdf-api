'use strict';

const helmet = require('helmet'),
  express = require('express'),
  http = require('http'),
  healthcheck = require('./routes/healthcheck'),
  notFound = require('./routes/notFound'),
  filesConvert = require('./routes/filesConvert'),
  cors = require('cors'),
  validate = require('./middleware/validate'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./documentation/swagger.json'),
  config = require('config');

// Expecting massive load to increase max listeners
require('events').EventEmitter.defaultMaxListeners = 100;

const app = express();
const port = process.env.PORT || 3005;

app.set('port', port);
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ limit: '100kb', extended: false }));
app.use(helmet());
app.use(cors());

const path = '/';

if (config.get('documentation.enabled')) {
  app.use(path + 'docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.get(path + 'healthcheck', healthcheck.index);
app.post(
  path + 'files/convert/pdftohtml/base64',
  validate.validateHtmlFileArray,
  filesConvert.htmlToPdfBase64
);
app.use(notFound.index);

const server = http.createServer(app);
server.listen(app.get('port'), function () {
  console.info(`Express server listening on port ${port}`);
});

const closeServer = function (err) {
  if (err) {
    console.error('uncaughtException: ' + err);
  }
};

process.on('exit', closeServer);
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
process.on('uncaughtException', closeServer);

module.exports = app;
