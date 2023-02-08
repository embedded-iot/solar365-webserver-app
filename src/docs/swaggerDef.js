const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Solar 365 API documentation',
    description:
      '-- New features in V9 doc<br/>' +
      '+ Add new field <strong>status</strong> in Gateway List<br/>' +
      '+ Add new router <strong>/gateways/:gatewayId/status</strong>:Update gateway status status<br/><br/>' +
      '-- New features in V8 doc<br/>' +
      '+ Update <strong>Fault routers</strong><br/>' +
      '+ Add new router <strong>/faults/latest</strong>: Get last fault<br/><br/>' +
      '-- New features in V7 doc<br/>' +
      "+ Update model <strong>Fault</strong> with new fields <strong>category ('LoggerFault', 'Solar365Fault'), type ('Error', 'Warning'), event ('Devices', 'MPPT', 'String'), position ('Device id', 'Index number'), description</strong><br/>" +
      '+ Add new router <strong>/gateways/gateway-status/:gatewayId</strong>: Get gateway status<br/>' +
      '+ Add new router <strong>/gateways/gateway-status/:gatewayId/:deviceId</strong>: Get device status<br/><br/>' +
      '-- New features in V6 doc<br/>' +
      '+ Add new router <strong>/gateways/:gatewayId/settings</strong>: Get/Update gateway settings<br/>' +
      '+ Add the field <strong>deviceCount</strong> in <strong>Gateway</strong><br/>' +
      '+ Add the field <strong>deviceStatus</strong> in <strong>Statistic</strong><br/><br/>' +
      '-- New features in V5 doc<br/>' +
      '+ Add two new model <strong>Activity Log</strong><br/><br/>' +
      '-- New features in V4 doc<br/>' +
      '+ Add new router <strong>/deviceLogs/statistic</strong>: Get statistic device log by data name<br/>' +
      '-- New features in V3 doc<br/>' +
      '+ Add new router <strong>/deviceLogs/latest</strong>: Get last device log<br/>' +
      '+ Update router <strong>/deviceLogs/</strong>: add new param <strong>from|to</strong><br/>' +
      '+ Add two new model <strong>Fault and Statistic</strong><br/><br/>' +
      '-- New features in V2 doc<br/>' +
      '+ Add new model <strong>Gateway</strong>: Gateway is COM100<br/>' +
      '+ Update <strong>Device</strong> model: add new param <strong>gatewayId</strong><br/>' +
      '+ Update <strong>Device Log</strong> model: add new param <strong>gatewayId</strong> and <strong>deviceId</strong><br/>' +
      '=> Reference: 1 User => n Gateway => n Device => n Device Log<br/>',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/gateway/LICENSE',
    },
  },
  servers: [
    {
      url: `${config.env === 'production' ? config.domain.url : `http://localhost:${config.port}`}/api`,
    },
  ],
};

module.exports = swaggerDef;
