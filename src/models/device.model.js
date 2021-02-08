const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
    },
    deviceData: {
      type: Object,
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
 * Check if device name is taken
 * @param {string} name - The user's name
 * @param {ObjectId} [excludeDeviceId] - The name of the device to be excluded
 * @returns {Promise<boolean>}
 */
deviceSchema.statics.isDeviceNameTaken = async function (name, excludeDeviceId) {
  const user = await this.findOne({ name, _id: { $ne: excludeDeviceId } });
  return !!user;
};

/**
 * @typedef Device
 */
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
