const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { deviceLogValidation } = require('../../validations');
const { deviceLogController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(deviceLogValidation.createDeviceLog), deviceLogController.createDeviceLog)
  .get(auth(), validate(deviceLogValidation.getDeviceLogs), deviceLogController.getDeviceLogs);

router.route('/latest').get(auth(), deviceLogController.getLatestDeviceLog);

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
 *                - masterKey
 *                - deviceId
 *                - deviceLogData
 *              properties:
 *                deviceLogData:
 *                   type: array
 *              example:
 *                masterKey: Master key
 *                deviceId: "1"
 *                deviceLogData: [{
 *		          		"data_name":	"Nominal Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"System Time",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"CO2 Reduction",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kg"
 *         				}, {
 *		          		"data_name":	"PV1 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV1 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV2 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV2 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV3 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV3 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV4 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV4 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV5 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV5 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV6 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV6 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"A-B Line Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"B-C Line Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"C-A Line Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase A Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase B Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase C Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase A Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Phase B Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Phase C Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Grid Frequency",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"Hz"
 *         				}, {
 *		          		"data_name":	"PF",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Inverter Efficiency",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"%"
 *         				}, {
 *		          		"data_name":	"Interior Temperature",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"℃"
 *         				}, {
 *		          		"data_name":	"Inverter State 1",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Active Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"Reactive Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kvar"
 *         				}, {
 *		          		"data_name":	"Total DC Input Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"Hourly Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Daily Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Monthly Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Annual Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Total Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Upv-7",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Ipv-7",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Upv-8",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Ipv-8",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Blocking Status",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"ZVTR Protection",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"LVRT Protection",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Islanding Protection",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Insulation Resistance",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"MΩ"
 *         				}, {
 *		          		"data_name":	"MPPT 1 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"MPPT 2 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"MPPT 3 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"MPPT 4 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"Alarm information 0",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 1",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 2",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 3",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 4",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 5",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 6",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 7",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 8",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 9",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 16",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
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
 *          name: masterKey
 *          schema:
 *            type: string
 *          description: Master key
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
 *                - masterKey
 *                - deviceId
 *                - deviceLogData
 *              properties:
 *                deviceLogData:
 *                   type: array
 *              example:
 *                masterKey: Master key
 *                deviceId: "1"
 *                deviceLogData: [{
 *		          		"data_name":	"Nominal Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"System Time",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"CO2 Reduction",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kg"
 *         				}, {
 *		          		"data_name":	"PV1 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV1 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV2 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV2 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV3 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV3 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV4 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV4 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV5 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV5 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"PV6 Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"PV6 Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"A-B Line Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"B-C Line Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"C-A Line Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase A Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase B Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase C Voltage",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Phase A Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Phase B Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Phase C Current",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Grid Frequency",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"Hz"
 *         				}, {
 *		          		"data_name":	"PF",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Inverter Efficiency",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"%"
 *         				}, {
 *		          		"data_name":	"Interior Temperature",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"℃"
 *         				}, {
 *		          		"data_name":	"Inverter State 1",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Active Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"Reactive Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kvar"
 *         				}, {
 *		          		"data_name":	"Total DC Input Power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"Hourly Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Daily Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Monthly Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Annual Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Total Yield",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kWh"
 *         				}, {
 *		          		"data_name":	"Upv-7",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Ipv-7",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Upv-8",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"V"
 *         				}, {
 *		          		"data_name":	"Ipv-8",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"A"
 *         				}, {
 *		          		"data_name":	"Blocking Status",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"ZVTR Protection",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"LVRT Protection",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Islanding Protection",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Insulation Resistance",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"MΩ"
 *         				}, {
 *		          		"data_name":	"MPPT 1 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"MPPT 2 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"MPPT 3 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"MPPT 4 total input power",
 *		          		"data_value":	"--",
 *		          		"data_unit":	"kW"
 *         				}, {
 *		          		"data_name":	"Alarm information 0",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 1",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 2",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 3",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 4",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 5",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 6",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 7",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 8",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 9",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
 *         				}, {
 *		          		"data_name":	"Alarm information 16",
 *		          		"data_value":	"--",
 *		          		"data_unit":	""
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

/**
 * @swagger
 * path:
 *  /deviceLogs/latest:
 *    get:
 *      summary: Get latest device log
 *      description: Get latest device log
 *      tags: [DeviceLogs]
 *      security:
 *        - bearerAuth: []
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
 */
