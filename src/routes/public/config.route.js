const express = require('express');
const validate = require('../../middlewares/validate');
const configController = require('../../controllers/config.controller');

const router = express.Router();

router.route('/').get(validate(), configController.getPublicConfigs);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Configs
 *   description: Config management and retrieval
 */

/**
 * @swagger
 * path:
 *  /configs:
 *    get:
 *      summary: Get all configs
 *      description: Only admins can retrieve all configs.
 *      tags: [Configs]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Config'
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */
