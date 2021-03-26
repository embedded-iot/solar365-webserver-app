const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const faultSchema = mongoose.Schema(
  {
    master: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Master',
      required: true,
    },
    faultData: {
      type: Object,
      required: true,
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
