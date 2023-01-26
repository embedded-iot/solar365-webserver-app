const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { statisticValidation } = require('../../validations');
const { statisticController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(statisticValidation.createStatistic), statisticController.createStatistic)
  .get(auth(), validate(statisticValidation.getStatistics), statisticController.getStatistics);

router
  .route('/latest')
  .get(auth(), validate(statisticValidation.getLatestStatistic), statisticController.getLatestStatistic);

router
  .route('/:statisticId')
  .get(auth(), validate(statisticValidation.getStatistic), statisticController.getStatistic)
  .patch(auth(), validate(statisticValidation.updateStatistic), statisticController.updateStatistic)
  .delete(auth(), validate(statisticValidation.deleteStatistic), statisticController.deleteStatistic);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: Statistic management and retrieval
 */

/**
 * @swagger
 * path:
 *  /statistics:
 *    post:
 *      summary: Create a statistic
 *      description: _
 *      tags: [Statistics]
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
 *                - statisticData
 *              properties:
 *                statisticData:
 *                   type: array
 *              example:
 *                masterKey: Master key
 *                statisticData: [{
 *                  "today_energy": "--",
 *                  "today_energy_unit": "kWh",
 *                  "total_energy": "--",
 *                  "total_energy_unit": "kWh",
 *                  "curr_power": "--",
 *                  "curr_power_unit": "kW",
 *                  "curr_reactive": "--",
 *                  "curr_reactive_unit": "kvar",
 *                  "rated_power": "--",
 *                  "rated_power_unit": "kW",
 *                  "rated_reactive": "--",
 *                  "rated_reactive_unit": "kvar",
 *                  "adjust_power_uplimit": "--",
 *                  "adjust_power_uplimit_unit": "kW",
 *                  "adjust_reactive_uplimit": "--",
 *                  "adjust_reactive_uplimit_unit": "kvar",
 *                  "adjust_reactive_lowlimit": "--",
 *                  "adjust_reactive_lowlimit_unit": "kvar"
 *                },
 *                {
 *                  "online_num": "0",
 *                  "online_num_unit": "",
 *                  "offline_num": "1",
 *                 "offline_num_unit": ""
 *               }]
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Statistic'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *
 *    get:
 *      summary: Get all statistics
 *      description: _
 *      tags: [Statistics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: masterKey
 *          schema:
 *            type: string
 *          description: Master key
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
 *          description: Maximum number of statistics
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
 *                      $ref: '#/components/schemas/Statistic'
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
 *  /statistics/{id}:
 *    get:
 *      summary: Get a statistic
 *      description: Get statistic by ID
 *      tags: [Statistics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Statistic id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Statistic'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a statistic
 *      description: Update statistic by ID
 *      tags: [Statistics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Statistic id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - masterKey
 *                - statisticData
 *              properties:
 *                statisticData:
 *                   type: array
 *              example:
 *                masterKey: Master key
 *                statisticData: []
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Statistic'
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
 *      summary: Delete a statistic
 *      description: Delete statistic by ID
 *      tags: [Statistics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Statistic id
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
 *  /statistics/latest:
 *    get:
 *      summary: Get latest statistic
 *      description: Get latest statistic
 *      tags: [Statistics]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: masterKey
 *          schema:
 *            type: string
 *          description: Master key
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Statistic'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
