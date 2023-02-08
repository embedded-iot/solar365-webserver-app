const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const statisticSchema = mongoose.Schema(
  {
    gateway: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gateway',
      required: true,
    },
    statisticData: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
statisticSchema.plugin(toJSON);
statisticSchema.plugin(paginate);

/**
 * @typedef Statistic
 */
const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;
