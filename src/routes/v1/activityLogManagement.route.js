const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { activityLogValidation } = require('../../validations');
const { activityLogController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(
    auth('manageActivityLogs'),
    validate(activityLogValidation.getActivityLogsManagement),
    activityLogController.getActivityLogsManagement
  );

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ActivityLogsManagement
 *   description: (ADMIN) ActivityLog management and retrieval
 */

/**
 * @swagger
 * path:
 *  /admin/activityLogs:
 *    get:
 *      summary: Get all activityLogs
 *      description: Only admin can get all activity logs of other users
 *      tags: [ActivityLogsManagement]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of activityLogs
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
 *                      $ref: '#/components/schemas/ActivityLog'
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
