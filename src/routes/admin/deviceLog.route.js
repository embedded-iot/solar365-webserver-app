const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { deviceLogValidation } = require('../../validations');
const { deviceLogController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(
    auth('manageDeviceLogs'),
    validate(deviceLogValidation.getDeviceLogsManagement),
    deviceLogController.getDeviceLogsManagement
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: DeviceLogsManagement
 *   description: (ADMIN) DeviceLog management and retrieval
 */

/**
 * @swagger
 * path:
 *  /admin/deviceLogs:
 *    get:
 *      summary: Get all deviceLogs
 *      description: Only admin can get all device logs of other users
 *      tags: [DeviceLogsManagement]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *        - in: query
 *          name: deviceId
 *          schema:
 *            type: string
 *          description: Device Id
 *        - in: query
 *          name: from
 *          schema:
 *            type: string
 *          description: Start datetime. ex. 2021-03-15 00:00:00
 *        - in: query
 *          name: to
 *          schema:
 *            type: string
 *          description: End datetime
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of deviceLogs
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
 *                      $ref: '#/components/schemas/DeviceLog'
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
