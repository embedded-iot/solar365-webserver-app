const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Gateway = require('./gateway.model');

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

projectSchema.pre('remove', async function (next) {
  const project = this;
  await Gateway.deleteMany({ project: project._id });
  next();
});

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
