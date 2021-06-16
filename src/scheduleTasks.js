const cron = require('node-cron');
const { masterController, activityLogController, deviceLogController,
  statisticController, faultController } = require('./controllers');

const start = async () => {
  // every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    await masterController.autoUpdateMasterStatus();
  });
  // every 1 hour
  cron.schedule('* */1 * * *', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const filter = {
      updatedAt: {
        $lt: yesterday,
      },
    };
    await activityLogController.clearData(filter);
    await deviceLogController.clearData(filter);
    await statisticController.clearData(filter);
    await faultController.clearData(filter);
  });
};

module.exports = {
  start,
};
