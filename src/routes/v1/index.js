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

const userManagementRoute = require('./userManagement.route');
const projectManagementRoute = require('./projectManagement.route');
const gatewayManagementRoute = require('./gatewayManagement.route');
const deviceManagementRoute = require('./deviceManagement.route');
const deviceLogManagementRoute = require('./deviceLogManagement.route');
const faultManagementRoute = require('./faultManagement.route');
const activityLogManagementRoute = require('./activityLogManagement.route');

const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
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
    path: '/dashboard',
    route: dashboardRoute,
  },
  {
    path: '/admin/users',
    route: userManagementRoute,
  },
  {
    path: '/admin/gateways',
    route: gatewayManagementRoute,
  },
  {
    path: '/admin/projects',
    route: projectManagementRoute,
  },
  {
    path: '/admin/devices',
    route: deviceManagementRoute,
  },
  {
    path: '/admin/deviceLogs',
    route: deviceLogManagementRoute,
  },
  {
    path: '/admin/faults',
    route: faultManagementRoute,
  },
  {
    path: '/admin/activityLogs',
    route: activityLogManagementRoute,
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
