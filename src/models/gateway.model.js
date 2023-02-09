const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Device = require('./device.model');
const DeviceLog = require('./deviceLog.model');
const { status } = require('../config/constants');

const gatewaySchema = mongoose.Schema(
  {
    gatewayId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enums: status,
      default: 'offline',
    },
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    settings: {
      type: Object,
      description: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
gatewaySchema.plugin(toJSON);
gatewaySchema.plugin(paginate);

/**
 * Check if Gateway id is taken
 * @param {string} gatewayId - The gateway's key
 * @param {ObjectId} [excludeGatewayId] - The id of the gateway to be excluded
 * @returns {Promise<boolean>}
 */
gatewaySchema.statics.isGatewayIdTaken = async function (gatewayId, excludeGatewayId) {
  const gateway = await this.findOne({ gatewayId, _id: { $ne: excludeGatewayId } });
  return !!gateway;
};

gatewaySchema.pre('remove', async function (next) {
  const gateway = this;
  await DeviceLog.deleteMany({ gateway: gateway._id });
  await Device.deleteMany({ gateway: gateway._id });
  next();
});

/**
 * @typedef Gateway
 */
const Gateway = mongoose.model('Gateway', gatewaySchema);

module.exports = Gateway;
