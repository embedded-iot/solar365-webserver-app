const express = require('express');
const validate = require('../../middlewares/validate');
const { deviceAppController } = require('../../controllers');
const { deviceAppValidation } = require('../../validations');

const router = express.Router();

router
  .route('/gateways/:gatewayId/sync-data')
  .post(validate(deviceAppValidation.syncRealDevices), deviceAppController.syncRealDevices);

router
  .route('/gateways/:gatewayId/settings')
  .get(validate(deviceAppValidation.getGatewaySettings), deviceAppController.getGatewaySettings);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Devices App
 *   description: (DEVICE APP) Sync devices data and server
 */

/**
 * @swagger
 * path:
 *  /deviceApp/gateways/{gatewayId}/sync-data:
 *    post:
 *      summary: Sync real devices to server
 *      description: Sync real devices to server
 *      tags: [Devices App]
 *      parameters:
 *        - in: path
 *          name: gatewayId
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway Id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              example:
 *                [
 *                  {
 *                    "type": "INVERTER",
 *                    "deviceId": 1,
 *                    "name": "Inverter 1",
 *                    "ipAddress": "192.168.0.100",
 *                    "port": 502,
 *                    "startDataAddress": 8000,
 *                    "endDataAddress": 9000,
 *                    "state": "Online",
 *                    "dataList": [
 *                      {
 *                        "name": "SN",
 *                        "address": [4990, 4999],
 *                        "dataType": "UTF-8",
 *                        "value": "SN123456",
 *                        "unit": ""
 *                      }
 *                    ]
 *                  },
 *                  {
 *                    "type": "LOGGER",
 *                    "deviceId": 2,
 *                    "name": "Logger3000",
 *                    "ipAddress": "12.12.12.12",
 *                    "port": 502,
 *                    "startDataAddress": 8000,
 *                    "endDataAddress": 9000,
 *                    "state": "Online",
 *                    "dataList": [
 *                      {
 *                        "name": "Device type code",
 *                        "address": [8000],
 *                        "dataType": "U16",
 *                        "value": "0x0705",
 *                        "unit": ""
 *                      }
 *                    ]
 *                  }
 *                ]
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
 *  /deviceApp/gateways/{gatewayId}/settings:
 *    get:
 *      summary: Get a gateway settings
 *      description: Get gateway settings by Gateway Id
 *      tags: [Devices App]
 *      parameters:
 *        - in: path
 *          name: gatewayId
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway Id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/GatewaySetting'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
