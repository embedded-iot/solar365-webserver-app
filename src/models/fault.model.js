const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { faultCategories, faultTypes } = require('../config/constants');

const faultSchema = mongoose.Schema(
  {
    device: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Device',
      required: true,
    },
    category: {
      type: String,
      enum: faultCategories,
      required: true,
    },
    type: {
      type: String,
      enum: faultTypes,
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
