const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const masterRoute = require('./master.route');
const deviceRoute = require('./device.route');
const deviceLogRoute = require('./deviceLog.route');
const faultRoute = require('./fault.route');
const statisticRoute = require('./statistic.route');
const activityLogRoute = require('./activityLog.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/masters',
    route: masterRoute,
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
    path: '/docs',
    route: docsRoute,
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
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
