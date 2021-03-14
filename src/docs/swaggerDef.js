const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Solar 365 API documentation',
    description:
      '-- New features in V3 doc<br/>' +
      '+ Add new router <strong>/deviceLogs/latest</strong>: Get last device log<br/>' +
      '+ Update router <strong>/deviceLogs/</strong>: add new param <strong>from|to</strong><br/>' +
      '+ Add two new model <strong>Fault and Statistic</strong><br/><br/>' +
      '-- New features in V2 doc<br/>' +
      '+ Add new model <strong>Master</strong>: Master is COM100<br/>' +
      '+ Update <strong>Device</strong> model: add new param <strong>masterKey</strong><br/>' +
      '+ Update <strong>Device Log</strong> model: add new param <strong>masterKey</strong> and <strong>deviceId</strong><br/>' +
      '=> Reference: 1 User => n Master => n Device => n Device Log<br/>',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

module.exports = swaggerDef;
