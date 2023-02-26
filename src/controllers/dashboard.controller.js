const catchAsync = require('../utils/catchAsync');
const { deviceService, gatewayService, deviceLogService, faultService } = require('../services');
const pick = require('../utils/pick');

const getDashboardOverview = catchAsync(async (req, res) => {
  const { gatewayId } = pick(req.query, ['gatewayId']);
  const filter = {
    gatewayId,
  };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await gatewayService.queryGateways(filter, options);
  const results = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < result.results.length; index++) {
    const gateway = result.results[index];
    // eslint-disable-next-line no-await-in-loop
    const deviceResult = await deviceService.queryDevices({ gateway: gateway._id }, options, '');
    const transformedDevices = [];
    // eslint-disable-next-line no-plusplus
    for (let deviceIndex = 0; deviceIndex < deviceResult.results.length; deviceIndex++) {
      const device = deviceResult.results[deviceIndex];
      // eslint-disable-next-line no-await-in-loop
      const deviceLogResult = await deviceLogService.queryDeviceLogs({ device: device._id }, options, '');
      transformedDevices.push({
        ...device.toJSON(),
        dataList: deviceLogResult.results && deviceLogResult.results.length ? deviceLogResult.results[0].toJSON().list : [],
      });
    }
    // eslint-disable-next-line no-await-in-loop
    const faultResult = await faultService.queryFaults({ gateway: gateway._id }, options);
    results.push({
      ...gateway.toJSON(),
      devices: transformedDevices,
      faults: faultResult.results,
    });
  }
  res.send(results);
});

module.exports = {
  getDashboardOverview,
};
