const cron = require('node-cron');
const { gatewayController, configController } = require('./controllers');
const { SYSTEM_CONFIG } = require('./config/constants');

const start = async () => {
  // every 5 minutes
  cron.schedule('*/1 * * * *', async () => {
    const updateGatewayTime = await configController.getConfigByName(SYSTEM_CONFIG.UPDATE_GATEWAY_AFTER_TIMES);
    await gatewayController.autoUpdateGatewayStatus(
      !!updateGatewayTime && updateGatewayTime.value ? +updateGatewayTime.value : 1000
    );
  });
};

module.exports = {
  start,
};
