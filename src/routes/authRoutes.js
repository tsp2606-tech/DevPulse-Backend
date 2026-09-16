import express from 'express';
import { generateGuestToken } from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API Xác thực
 */

/**
 * @swagger
 * /api/auth/guest:
 *   get:
 *     summary: Lấy Guest Token
 *     description: Cấp một JWT Token ẩn danh (guestId) cho client để sử dụng cho việc upvote.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Trả về JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 guestId:
 *                   type: string
 */
router.get('/guest', generateGuestToken);

export default router;
