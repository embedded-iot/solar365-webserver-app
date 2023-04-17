const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const configSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
configSchema.plugin(toJSON);
configSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The config's name
 * @param {ObjectId} [excludeConfigId] - The id of the config to be excluded
 * @returns {Promise<boolean>}
 */
configSchema.statics.isNameTaken = async function (name, excludeConfigId) {
  const config = await this.findOne({ name, _id: { $ne: excludeConfigId } });
  return !!config;
};

/**
 * @typedef Config
 */
const Config = mongoose.model('Config', configSchema);

module.exports = Config;
