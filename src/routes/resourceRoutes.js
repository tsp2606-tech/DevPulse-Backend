import express from 'express';
import * as resourceController from '../controllers/resourceController.js';
import { validate } from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: Quản lý danh sách các tài liệu / công cụ (Resources)
 */

/**
 * @swagger
 * /api/resources:
 *   get:
 *     summary: Lấy danh sách tài nguyên
 *     description: Lấy danh sách tài nguyên, có hỗ trợ tìm kiếm, lọc theo danh mục, tag và sắp xếp.
 *     tags: [Resources]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Tìm kiếm theo tiêu đề hoặc nội dung tóm tắt
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Lọc theo danh mục (Frontend, Backend, DevOps, AI, Mobile, UI/UX)
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Lọc theo một tag cụ thể
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [newest, upvotes]
 *           default: newest
 *         description: Sắp xếp kết quả trả về
 *     responses:
 *       200:
 *         description: Danh sách tài nguyên
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       500:
 *         description: Lỗi Server
 */
router.get('/', resourceController.getAll);

/**
 * @swagger
 * /api/resources:
 *   post:
 *     summary: Thêm mới tài nguyên
 *     description: Tạo một tài nguyên mới, kiểm tra dữ liệu bằng Zod validation.
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceInput'
 *           example:
 *             title: "Tailwind CSS Document"
 *             url: "https://tailwindcss.com/docs"
 *             category: "Frontend"
 *             tags: ["css", "tailwind", "ui"]
 *             summary: "Tài liệu chính thức của framework Tailwind CSS"
 *     responses:
 *       201:
 *         description: Đã tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Thành công
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Lỗi xác thực dữ liệu đầu vào (Validation Error)
 */
router.post('/', validate(resourceController.createSchema), resourceController.create);

/**
 * @swagger
 * /api/resources/{id}:
 *   put:
 *     summary: Cập nhật tài nguyên
 *     description: Sửa thông tin tài nguyên theo ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID của tài nguyên
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResourceInput'
 *           example:
 *             title: "Updated Title"
 *             url: "https://example.com/updated"
 *             category: "Backend"
 *             tags: ["updated", "tag"]
 *             summary: "This is an updated description"
 *     responses:
 *       200:
 *         description: Đã cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã cập nhật
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: ID không hợp lệ hoặc lỗi validation
 *       404:
 *         description: Không tìm thấy tài nguyên
 */
router.put('/:id', validate(resourceController.createSchema), resourceController.update);

/**
 * @swagger
 * /api/resources/{id}:
 *   delete:
 *     summary: Xóa tài nguyên
 *     description: Xóa một tài nguyên khỏi database bằng ID
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID của tài nguyên
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Đã xóa
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Không tìm thấy tài nguyên
 */
router.delete('/:id', resourceController.remove);

/**
 * @swagger
 * /api/resources/{id}/upvote:
 *   patch:
 *     summary: Tăng lượt bình chọn
 *     description: Tăng lượt upvotes của tài nguyên thêm 1
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID của tài nguyên
 *     responses:
 *       200:
 *         description: Upvote thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Upvote thành công
 *                 data:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: ID không hợp lệ
 *       404:
 *         description: Không tìm thấy tài nguyên
 */
router.patch('/:id/upvote', verifyToken, resourceController.upvote);

export default router;
