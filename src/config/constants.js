const STATE_VALUES = {
  ACTIVATED: 'ACTIVATED',
  BLOCKED: 'BLOCKED',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
};

const userStates = [STATE_VALUES.ACTIVATED, STATE_VALUES.BLOCKED];
const gatewayStates = [STATE_VALUES.ONLINE, STATE_VALUES.ONLINE];

module.exports = {
  STATE_VALUES,
  userStates,
  gatewayStates,
};
