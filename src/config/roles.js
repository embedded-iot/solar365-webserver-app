const ROLE_VALUES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

const roles = [ROLE_VALUES.ADMIN, ROLE_VALUES.USER];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'manageGateways']);

module.exports = {
  ROLE_VALUES,
  roles,
  roleRights,
};
