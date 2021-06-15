const cron = require('node-cron');
const { masterController } = require('./controllers');

const start = async () => {
  cron.schedule('*/5 * * * *', async () => {
    await masterController.autoUpdateMasterStatus();
  });
};

module.exports = {
  start,
};
