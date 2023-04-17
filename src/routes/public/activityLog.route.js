const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { activityLogValidation } = require('../../validations');
const { activityLogController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(activityLogValidation.createActivityLog), activityLogController.createActivityLog)
  .get(auth(), validate(activityLogValidation.getActivityLogs), activityLogController.getActivityLogs);

router
  .route('/:activityLogId')
  .get(auth(), validate(activityLogValidation.getActivityLog), activityLogController.getActivityLog)
  .patch(auth(), validate(activityLogValidation.updateActivityLog), activityLogController.updateActivityLog)
  .delete(auth(), validate(activityLogValidation.deleteActivityLog), activityLogController.deleteActivityLog);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: ActivityLogs
 *   description: ActivityLog management and retrieval
 */

/**
 * @swagger
 * path:
 *  /activityLogs:
 *    post:
 *      summary: Create a activityLog
 *      description: _
 *      tags: [ActivityLogs]
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
 *                - category
 *                - type
 *                - description
 *              properties:
 *                gatewayId:
 *                   type: string
 *                category:
 *                   type: string
 *                type:
 *                   type: string
 *                description:
 *                   type: string
 *                details:
 *                   type: string
 *              example:
 *                gatewayId: Gateway id
 *                category: Gateway
 *                type: Success
 *                description: Gateway not found
 *                details: 45bac534954b54139806c112
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ActivityLog'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *
 *    get:
 *      summary: Get all activityLogs
 *      description: _
 *      tags: [ActivityLogs]
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

/**
 * @swagger
 * path:
 *  /activityLogs/{id}:
 *    get:
 *      summary: Get a activityLog
 *      description: Get activityLog by ID
 *      tags: [ActivityLogs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ActivityLog id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ActivityLog'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a activityLog
 *      description: Update activityLog by ID
 *      tags: [ActivityLogs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ActivityLog id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - category
 *                - type
 *                - description
 *              properties:
 *                gatewayId:
 *                   type: string
 *                category:
 *                   type: string
 *                type:
 *                   type: string
 *                description:
 *                   type: string
 *                details:
 *                   type: string
 *              example:
 *                gatewayId: Gateway id
 *                category: Gateway
 *                type: Success
 *                description: Gateway not found
 *                details: 45bac534954b54139806c112
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/ActivityLog'
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
 *      summary: Delete a activityLog
 *      description: Delete activityLog by ID
 *      tags: [ActivityLogs]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: ActivityLog id
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
