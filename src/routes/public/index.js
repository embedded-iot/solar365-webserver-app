const express = require('express');
const authRoute = require('./auth.route');
const projectRoute = require('./project.route');
const gatewayRoute = require('./gateway.route');
const deviceRoute = require('./device.route');
const deviceLogRoute = require('./deviceLog.route');
const faultRoute = require('./fault.route');
const statisticRoute = require('./statistic.route');
const activityLogRoute = require('./activityLog.route');
const deviceAppRoute = require('./deviceApp.route');
const dashboardRoute = require('./dashboard.route');
const configRoute = require('./config.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/projects',
    route: projectRoute,
  },
  {
    path: '/gateways',
    route: gatewayRoute,
  },
  {
    path: '/devices',
    route: deviceRoute,
  },
  {
    path: '/deviceLogs',
    route: deviceLogRoute,
  },
  {
    path: '/faults',
    route: faultRoute,
  },
  {
    path: '/statistics',
    route: statisticRoute,
  },
  {
    path: '/activityLogs',
    route: activityLogRoute,
  },
  {
    path: '/deviceApp',
    route: deviceAppRoute,
  },
  {
    path: '/configs',
    route: configRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'production' || config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;