const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const deviceValidation = require('../../validations/device.validation');
const deviceController = require('../../controllers/device.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('manageDevices'), validate(deviceValidation.getDevicesManagement), deviceController.getDevicesManagement);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: DevicesManagement
 *   description: (ADMIN) Device management and retrieval
 */

/**
 * @swagger
 * path:
 *  /admin/devices:
 *    get:
 *      summary: Get all devices
 *      description: Only admin can get all device of other users
 *      tags: [DevicesManagement]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *          description: Search by name ...
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of devices
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
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
 *                      $ref: '#/components/schemas/Device'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */
