const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { faultValidation } = require('../../validations');
const { faultController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth('manageActivityLogs'), validate(faultValidation.getFaultsManagement), faultController.getFaultsManagement);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: FaultsManagement
 *   description: (ADMIN) Fault management and retrieval
 */

/**
 * @swagger
 * path:
 *  /admin/faults:
 *    get:
 *      summary: Get all faults
 *      description: Only admin can get all gateways of other users
 *      tags: [FaultsManagement]
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
 *            type: number
 *          description: Device id
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of faults
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
 *                      $ref: '#/components/schemas/Fault'
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
