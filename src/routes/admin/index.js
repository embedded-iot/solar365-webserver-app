const express = require('express');

const user = require('./user.route');
const project = require('./project.route');
const gateway = require('./gateway.route');
const device = require('./device.route');
const deviceLog = require('./deviceLog.route');
const fault = require('./fault.route');
const activityLog = require('./activityLog.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: user,
  },
  {
    path: '/gateways',
    route: gateway,
  },
  {
    path: '/projects',
    route: project,
  },
  {
    path: '/devices',
    route: device,
  },
  {
    path: '/deviceLogs',
    route: deviceLog,
  },
  {
    path: '/faults',
    route: fault,
  },
  {
    path: '/activityLogs',
    route: activityLog,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
