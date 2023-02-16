const express = require('express');
const validate = require('../../middlewares/validate');
const { deviceAppController } = require('../../controllers');
const { deviceAppValidation } = require('../../validations');

const router = express.Router();

router.route('/syncRealDevices').post(validate(deviceAppController.syncRealDevices), deviceAppValidation.syncRealDevices);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Devices App
 *   description: Gateway sync devices data to server
 */

/**
 * @swagger
 * path:
 *  /devices-app/syncRealDevices:
 *    post:
 *      summary: Sync real devices to server
 *      description: [Device only]
 *      tags: [Devices App]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - list
 *              properties:
 *                gatewayId:
 *                  type: string
 *                  description: must be unique
 *                list:
 *                   type: array
 *              example:
 *                gatewayId: Gateway id
 *                list: [
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
