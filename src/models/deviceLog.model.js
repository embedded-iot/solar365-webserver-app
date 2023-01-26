const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deviceLogSchema = mongoose.Schema(
  {
    master: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Master',
      required: true,
    },
    device: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Device',
      required: true,
    },
    deviceLogData: {
      type: Array,
    },
    deviceLogIOData: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
deviceLogSchema.plugin(toJSON);
deviceLogSchema.plugin(paginate);

/**
 * @typedef DeviceLog
 */
const DeviceLog = mongoose.model('DeviceLog', deviceLogSchema);

module.exports = DeviceLog;
