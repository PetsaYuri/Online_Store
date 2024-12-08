import { Router } from "express";
const router: Router = Router();
import uploadImageController from "../controllers/uploadImageController";
const controller = uploadImageController();

/**
 * @swagger
 * /api/uploadImage:
 *   post:
 *      summary: Upload an image
 *      consumes:
 *          - multipart/form-data
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary   
 *      description: upload image
 *      responses:
 *        200:
 *         description: success
 */
router.post('/', controller.uploadImage);

export default router;