const cron = require('node-cron');
const { gatewayController } = require('./controllers');

const start = async () => {
  // every 5 minutes
  cron.schedule('*/1 * * * *', async () => {
    await gatewayController.autoUpdateGatewayStatus(1000);
  });
};

module.exports = {
  start,
};
