const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const deviceLogSchema = mongoose.Schema(
  {
    device: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Device',
      required: true,
    },
    list: [
      {
        name: String,
        address: [Number],
        dataType: String,
        value: String,
        unit: String,
      },
    ],
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
