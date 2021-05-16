const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const masterValidation = require('../../validations/master.validation');
const masterController = require('../../controllers/master.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(masterValidation.createMaster), masterController.createMaster)
  .get(auth(), validate(masterValidation.getMasters), masterController.getMasters);

router.route('/master-status/:masterKey').get(validate(masterValidation.getMasterStatus), masterController.getMasterStatus);

router
  .route('/master-status/:masterKey/:deviceId')
  .get(validate(masterValidation.getDevicesStatus), masterController.getDevicesStatus);

router
  .route('/:masterKey/settings')
  .get(validate(masterValidation.getMasterSettings), masterController.getMasterSettings)
  .patch(auth('manageMasters'), validate(masterValidation.updateMasterSettings), masterController.updateMasterSettings);

router
  .route('/:masterId')
  .get(auth(), validate(masterValidation.getMaster), masterController.getMaster)
  .patch(auth(), validate(masterValidation.updateMaster), masterController.updateMaster)
  .delete(auth(), validate(masterValidation.deleteMaster), masterController.deleteMaster);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Masters
 *   description: Master management and retrieval
 */

/**
 * @swagger
 * path:
 *  /masters:
 *    post:
 *      summary: Create a master
 *      description: _
 *      tags: [Masters]
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
 *              properties:
 *                masterKey:
 *                  type: string
 *                  description: must be unique
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                masterKey: MASTER_KEY
 *                name: Master name
 *                description: Master description
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Master'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all masters
 *      description: _
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: name
 *          schema:
 *            type: string
 *          description: Master name
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
 *          description: Maximum number of masters
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
 *                      $ref: '#/components/schemas/Master'
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
 *  /masters/{id}:
 *    get:
 *      summary: Get a master
 *      description: Get master by ID
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Master id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Master'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a master
 *      description: Update master by ID
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Master id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - masterKey
 *                - name
 *              properties:
 *                masterKey:
 *                  type: string
 *                  description: must be unique
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                masterKey: MASTER_KEY
 *                name: Master name
 *                description: Master description
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Master'
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
 *      summary: Delete a master
 *      description: Delete master by ID
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Master id
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
 *  /masters/{masterKey}/settings:
 *    get:
 *      summary: Get a master settings
 *      description: Get master settings by Master Key
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: masterKey
 *          required: true
 *          schema:
 *            type: string
 *          description: Master Key
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 example: {
 *                   intervalRefresh: 120000,
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
 *      summary: Update a master settings
 *      description: Update master by Master Key
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: masterKey
 *          required: true
 *          schema:
 *            type: string
 *          description: Master Key
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
 *                  intervalRefresh: 12000,
 *                  price: 2000
 *                }
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 example: {
 *                   intervalRefresh: 120000,
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
 *  /masters/master-status/{masterKey}:
 *    get:
 *      summary: Get master status
 *      description: Get master status by Master Key
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: masterKey
 *          required: true
 *          schema:
 *            type: string
 *          description: Master Key
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
 *  /masters/master-status/{masterKey}/{deviceId}:
 *    get:
 *      summary: Get device status
 *      description: Get device status by Master Key and Device ID
 *      tags: [Masters]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: masterKey
 *          required: true
 *          schema:
 *            type: string
 *          description: Master Key
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
