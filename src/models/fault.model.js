const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categories = ['LoggerFault', 'Solar365Fault'];
const events = ['Devices', 'MPPT', 'String'];
const types = ['Error', 'Warning'];

const faultSchema = mongoose.Schema(
  {
    gateway: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gateway',
      required: true,
    },
    device: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Device',
      required: true,
    },
    category: {
      type: String,
      enum: categories,
      required: true,
    },
    type: {
      type: String,
      enum: types,
      required: true,
    },
    event: {
      type: String,
      enum: events,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    reason: {
      type: String,
    },
    suggest: {
      type: String,
    },
    faultData: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
faultSchema.plugin(toJSON);
faultSchema.plugin(paginate);

/**
 * @typedef Fault
 */
const Fault = mongoose.model('Fault', faultSchema);

module.exports = Fault;
