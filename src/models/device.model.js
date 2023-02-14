const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const DeviceLog = require('./deviceLog.model');
const { deviceTypes, DEVICE_TYPE_VALUES, STATE_VALUES, deviceStates } = require('../config/constants');

const deviceSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: deviceTypes,
      default: DEVICE_TYPE_VALUES.INVERTER,
      required: true,
    },
    deviceId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    port: {
      type: Number,
    },
    startDataAddress: {
      type: Number,
    },
    endDataAddress: {
      type: Number,
    },
    state: {
      type: String,
      enums: deviceStates,
      default: STATE_VALUES.OFFLINE,
    },
    gateway: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gateway',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
deviceSchema.plugin(toJSON);
deviceSchema.plugin(paginate);

/**
 * Check if device Id is taken
 * @param {string} deviceId - The device's id
 * @param {ObjectId} [excludeDeviceId] - The name of the device to be excluded
 * @returns {Promise<boolean>}
 */
deviceSchema.statics.isDeviceIdTaken = async function (deviceId, excludeDeviceId) {
  const user = await this.findOne({ deviceId, _id: { $ne: excludeDeviceId } });
  return !!user;
};

deviceSchema.pre('remove', async function (next) {
  const device = this;
  await DeviceLog.deleteMany({ device: device._id });
  next();
});

/**
 * @typedef Device
 */
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
