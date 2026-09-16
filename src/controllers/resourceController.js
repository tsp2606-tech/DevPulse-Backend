import * as resourceService from '../services/resourceService.js';
import { z } from 'zod';
import mongoose from 'mongoose';

export const createSchema = z.object({
  title: z.string().min(3).max(100).transform(s => s.trim()),
  url: z.string().url(),
  category: z.enum(["Frontend", "Backend", "DevOps", "AI", "Mobile", "UI/UX"]),
  tags: z.array(z.string().max(20).regex(/^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/).transform(s => s.toLowerCase())).min(1).max(5),
  summary: z.string().max(300).optional()
});

export const create = async (req, res) => {
  try {
    const resource = await resourceService.createResource(req.body);
    res.status(201).json({ message: 'Thành công', data: resource });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const resources = await resourceService.getResources(req.query);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  try {
    const resource = await resourceService.updateResource(req.params.id, req.body);
    if (!resource) return res.status(404).json({ message: 'Không tìm thấy' });
    res.status(200).json({ message: 'Đã cập nhật', data: resource });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  try {
    const resource = await resourceService.deleteResource(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Không tìm thấy' });
    res.status(200).json({ message: 'Đã xóa' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const upvote = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'ID không hợp lệ' });
  }
  try {
    const guestId = req.user?.guestId;
    if (!guestId) {
      return res.status(401).json({ message: 'Yêu cầu token xác thực (guestId)' });
    }
    const resource = await resourceService.upvoteResource(req.params.id, guestId);
    res.status(200).json({ message: 'Upvote thành công', data: resource });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || 'Lỗi server' });
  }
};
