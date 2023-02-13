const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gatewayValidation = require('../../validations/gateway.validation');
const gatewayController = require('../../controllers/gateway.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(gatewayValidation.createGateway), gatewayController.createGateway)
  .get(auth(), validate(gatewayValidation.getGateways), gatewayController.getGateways);

router
  .route('/gateway-status/:gatewayId')
  .get(validate(gatewayValidation.getGatewayStatus), gatewayController.getGatewayStatus);

router
  .route('/gateway-status/:gatewayId/:deviceId')
  .get(validate(gatewayValidation.getDevicesStatus), gatewayController.getDevicesStatus);

router
  .route('/:gatewayId/status')
  .post(validate(gatewayValidation.updateGatewayStatus), gatewayController.updateGatewayStatus);

router
  .route('/:gatewayId/settings')
  .get(validate(gatewayValidation.getGatewaySettings), gatewayController.getGatewaySettings)
  .patch(auth('manageGateways'), validate(gatewayValidation.updateGatewaySettings), gatewayController.updateGatewaySettings);

router
  .route('/:gatewayId')
  .get(auth(), validate(gatewayValidation.getGateway), gatewayController.getGateway)
  .patch(auth(), validate(gatewayValidation.updateGateway), gatewayController.updateGateway)
  .delete(auth(), validate(gatewayValidation.deleteGateway), gatewayController.deleteGateway);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Gateways
 *   description: Gateway management and retrieval
 */

/**
 * @swagger
 * path:
 *  /gateways:
 *    post:
 *      summary: Create a gateway
 *      description: _
 *      tags: [Gateways]
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
 *                - name
 *              properties:
 *                gatewayId:
 *                  type: string
 *                  description: must be unique
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                gatewayId: Gateway id
 *                name: Gateway name
 *                description: Gateway description
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all gateways
 *      description: _
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Gateway name
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
 *          description: Maximum number of gateways
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
 *                      $ref: '#/components/schemas/Gateway'
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
 *  /gateways/{id}:
 *    get:
 *      summary: Get a gateway
 *      description: Get gateway by ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a gateway
 *      description: Update gateway by ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - name
 *              properties:
 *                gatewayId:
 *                  type: string
 *                  description: must be unique
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                gatewayId: Gateway id
 *                name: Gateway name
 *                description: Gateway description
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
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
 *      summary: Delete a gateway
 *      description: Delete gateway by ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway id
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
 *  /gateways/{gatewayId}/status:
 *    post:
 *      summary: Update a gateway status
 *      description: Update gateway status by Gateway Id
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
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
 *              type: object
 *              required:
 *                - status
 *              properties:
 *                status:
 *                  type: bool
 *                  description: status bool
 *              example:
 *                status: true
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
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
 *  /gateways/{gatewayId}/settings:
 *    get:
 *      summary: Get a gateway settings
 *      description: Get gateway settings by Gateway Id
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
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
 *                 example: {
 *                   refreshDataAfterTime: 120000,
 *                   price: 2000
 *                 }
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a gateway settings
 *      description: Update gateway by Gateway Id
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
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
 *              type: object
 *              required:
 *                - settings
 *              properties:
 *                settings:
 *                  type: object
 *                  description: settings object
 *              example:
 *                settings: {
 *                  refreshDataAfterTime: 12000,
 *                  price: 2000
 *                }
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 example: {
 *                   refreshDataAfterTime: 120000,
 *                   price: 2000
 *                 }
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
 *  /gateways/gateway-status/{gatewayId}:
 *    get:
 *      summary: Get gateway status
 *      description: Get gateway status by Gateway Id
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
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
 *                 example: {
 *                   statisticData: [],
 *                   faultData: []
 *                 }
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
 *  /gateways/gateway-status/{gatewayId}/{deviceId}:
 *    get:
 *      summary: Get device status
 *      description: Get device status by Gateway Id and Device ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: gatewayId
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway Id
 *        - in: path
 *          name: deviceId
 *          required: true
 *          schema:
 *            type: string
 *          description: Device ID
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 example: {
 *                   faultData: []
 *                 }
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
