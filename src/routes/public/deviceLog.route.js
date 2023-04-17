const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { deviceLogValidation } = require('../../validations');
const { deviceLogController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(deviceLogValidation.createDeviceLog), deviceLogController.createDeviceLog)
  .get(auth(), validate(deviceLogValidation.getDeviceLogs), deviceLogController.getDeviceLogs);

router
  .route('/:deviceLogId')
  .get(auth(), validate(deviceLogValidation.getDeviceLog), deviceLogController.getDeviceLog)
  .patch(auth(), validate(deviceLogValidation.updateDeviceLog), deviceLogController.updateDeviceLog)
  .delete(auth(), validate(deviceLogValidation.deleteDeviceLog), deviceLogController.deleteDeviceLog);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: DeviceLogs
 *   description: DeviceLog management and retrieval
 */

/**
 * @swagger
 * path:
 *  /deviceLogs:
 *    post:
 *      summary: Create a device log
 *      description: _
 *      tags: [DeviceLogs]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - deviceId
 *                - list
 *              properties:
 *                gatewayId:
 *                   type: string
 *                deviceId:
 *                   type: number
 *                list:
 *                   type: array
 *              example:
 *                gatewayId: Gateway id
 *                deviceId: 1
 *                list: [{
 *                  "name": "SN",
 *                  "address": [4990, 4999],
 *                  "dataType": "UTF-8",
 *                  "value": "SN123456",
 *                  "unit": ""
 *         				}]
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/DeviceLog'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *
 *    get:
 *      summary: Get all deviceLogs
 *      description: _
 *      tags: [DeviceLogs]
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

/**
 * @swagger
 * path:
 *  /deviceLogs/{id}:
 *    get:
 *      summary: Get a device log
 *      description: Get device log by ID
 *      tags: [DeviceLogs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: DeviceLog id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/DeviceLog'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a device log
 *      description: Update device log by ID
 *      tags: [DeviceLogs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: DeviceLog id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - deviceId
 *                - deviceLogData
 *              properties:
 *                deviceLogData:
 *                   type: array
 *              example:
 *                gatewayId: Gateway id
 *                deviceId: 1
 *                list: [{
 *                  "name": "SN",
 *                  "address": [4990, 4999],
 *                  "dataType": "UTF-8",
 *                  "value": "SN123456",
 *                  "unit": ""
 *         				}]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/DeviceLog'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a device log
 *      description: Delete device log by ID
 *      tags: [DeviceLogs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: DeviceLog id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
