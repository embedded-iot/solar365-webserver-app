const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Device = require('./device.model');
const DeviceLog = require('./deviceLog.model');
const { gatewayStates, STATE_VALUES } = require('../config/constants');

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
    project: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Project',
      required: true,
    },
    state: {
      type: String,
      enums: gatewayStates,
      default: STATE_VALUES.OFFLINE,
    },
    updatedStateAt: {
      type: Date,
      default: Date.now,
    },
    settings: {
      refreshDataAfterTime: {
        type: Number,
        default: 12000,
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
