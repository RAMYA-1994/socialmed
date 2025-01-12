import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth.js';
import { createPost, getPosts, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.post('/', authenticateToken, createPost);
router.get('/', getPosts);
router.put('/:id', authenticateToken, updatePost);
router.delete('/:id', authenticateToken, deletePost);

export default router;
