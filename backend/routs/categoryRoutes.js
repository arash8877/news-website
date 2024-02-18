import express from 'express';
import {verifyToken} from '../middleware/VerifyToken.js';
import { createCategory, deleteCategory, getCategoryForHomePage, updateCategory,getCategory } from '../controllers/CategoryController.js';


const router = express.Router();

router.get('/api/category/home', getCategoryForHomePage)

router.get('/api/get-category', getCategory)
router.post('/api/create-category', verifyToken, createCategory)
router.put('/api/update-category/:id', verifyToken, updateCategory)
router.delete('/api/delete-category/:id', verifyToken, deleteCategory)

export default router;