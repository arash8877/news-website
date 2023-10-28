import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import {
  activeComment,
  createComment,
  deactivateComment,
  deleteComment,
  getAllComments,
  getAllCommentsForSingleNews,
  updateComment,
} from "../controllers/CommentController.js";

const router = express.Router();

router.get("/api/comment", verifyToken, getAllComments);
router.get("/api/comment/:newsId", getAllCommentsForSingleNews);
router.post("/api/comment", createComment);
router.put("/api/comment/active/:id", verifyToken, activeComment);
router.put("/api/comment/deactivate/:id", verifyToken, deactivateComment);
router.put("/api/comment/:id", verifyToken, updateComment);
router.delete("/api/comment/:id", verifyToken, deleteComment);

export default router;