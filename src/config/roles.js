const ROLE_VALUES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const roles = [ROLE_VALUES.USER, ROLE_VALUES.ADMIN];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], [
  'manageUsers',
  'manageProjects',
  'manageGateways',
  'manageDevices',
  'manageDeviceLogs',
  'manageActivityLogs',
  'manageConfigs',
]);

module.exports = {
  ROLE_VALUES,
  roles,
  roleRights,
};
