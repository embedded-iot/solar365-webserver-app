const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const deviceValidation = require('../../validations/device.validation');
const deviceController = require('../../controllers/device.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(deviceValidation.createDevice), deviceController.createDevice)
  .get(auth(), validate(deviceValidation.getDevices), deviceController.getDevices);

router.route('/syncRealDevices').post(validate(deviceValidation.syncRealDevices), deviceController.syncRealDevices);

router
  .route('/:deviceId')
  .get(auth(), validate(deviceValidation.getDevice), deviceController.getDevice)
  .patch(auth(), validate(deviceValidation.updateDevice), deviceController.updateDevice)
  .delete(auth(), validate(deviceValidation.deleteDevice), deviceController.deleteDevice);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Device management and retrieval
 */

/**
 * @swagger
 * path:
 *  /devices:
 *    post:
 *      summary: Create a device
 *      description: _
 *      tags: [Devices]
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
 *                - name
 *                - deviceData
 *              properties:
 *                name:
 *                  type: string
 *                  description: must be unique
 *                deviceData:
 *                   type: object
 *              example:
 *                masterKey: Master key
 *                name: Device name
 *                description: Device description
 *                deviceData: {
 *                  "id": 1,
 *                  "dev_id": 1,
 *                  "dev_code": 61003,
 *                  "dev_type": 25,
 *                  "dev_sn": "",
 *                  "dev_name": "SUN2000(36~50)(COM3-001)",
 *                  "dev_model": "SUN2000(36~50)",
 *                  "port_name": "COM3",
 *                  "phys_addr": "1",
 *                  "logc_addr": "1",
 *                  "link_status": 0,
 *                  "init_status": 0,
 *                  "dev_special": "0",
 *                  "list": [ ]
 *                }
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Device'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all devices
 *      description: _
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: masterKey
 *          schema:
 *            type: string
 *          description: Master key
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Device name
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

/**
 * @swagger
 * path:
 *  /devices/syncRealDevices:
 *    post:
 *      summary: Sync real devices
 *      description: [Device only]
 *      tags: [Devices]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - masterKey
 *                - list
 *              properties:
 *                name:
 *                  type: string
 *                  description: must be unique
 *                deviceData:
 *                   type: object
 *              example:
 *                masterKey: Master key
 *                list: [
 *                  {
 *                    "id": 1,
 *                    "dev_id": 4,
 *                    "dev_code": 61003,
 *                    "dev_type": 25,
 *                    "dev_sn": "11212",
 *                    "dev_name": "SUN2000(36~50)(COM3-001)",
 *                    "dev_model": "SUN2000(36~50)",
 *                    "port_name": "COM3",
 *                    "phys_addr": "1",
 *                    "logc_addr": "1",
 *                    "link_status": 0,
 *                    "init_status": 0,
 *                    "dev_special": "0",
 *                    "list": []
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
 *  /devices/{id}:
 *    get:
 *      summary: Get a device
 *      description: Get device by ID
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Device id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Device'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a device
 *      description: Update device by ID
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Device id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - masterKey
 *                - name
 *                - deviceData
 *              properties:
 *                name:
 *                  type: string
 *                  description: must be unique
 *                deviceData:
 *                   type: object
 *              example:
 *                masterKey: Master key
 *                name: Device name
 *                description: Device description
 *                deviceData: {
 *                  "id": 1,
 *                  "dev_id": 1,
 *                  "dev_code": 61003,
 *                  "dev_type": 25,
 *                  "dev_sn": "",
 *                  "dev_name": "SUN2000(36~50)(COM3-001)",
 *                  "dev_model": "SUN2000(36~50)",
 *                  "port_name": "COM3",
 *                  "phys_addr": "1",
 *                  "logc_addr": "1",
 *                  "link_status": 0,
 *                  "init_status": 0,
 *                  "dev_special": "0",
 *                  "list": [ ]
 *                }
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Device'
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
 *      summary: Delete a device
 *      description: Delete device by ID
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Device id
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
