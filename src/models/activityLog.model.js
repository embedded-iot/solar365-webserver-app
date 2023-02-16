const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { activityLogCategories, activityLogTypes } = require('../config/constants');

const activityLogSchema = mongoose.Schema(
  {
    gateway: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Gateway',
      required: true,
    },
    category: {
      type: String,
      enum: activityLogCategories,
      required: true,
    },
    type: {
      type: String,
      enum: activityLogTypes,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: mongoose.SchemaTypes.ObjectId,
      refPath: 'category',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
activityLogSchema.plugin(toJSON);
activityLogSchema.plugin(paginate);

/**
 * @typedef ActivityLog
 */
const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

module.exports = ActivityLog;
