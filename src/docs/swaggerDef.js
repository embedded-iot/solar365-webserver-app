const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Solar 365 API documentation',
    description: `
      - Upload device data from device:
      POST /deviceApp/syncRealDevices
      ex: https://api.connector365.site/api/deviceApp/gateways/{gatewayId}/sync-data
      - Overview device data
      GET /dashboard/overview
      ex: https://api.connector365.site/api/dashboard/overview?gatewayId=Gateway%20id
    `,
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
