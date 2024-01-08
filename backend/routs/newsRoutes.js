import express, { Router } from "express";
import {
  createNews,
  deleteNews,
  getCatNews,
  getLastNews,
  getNews,
  getNewsById,
  getNewsDetails,
  popularNews,
  updateNews,
} from "../controllers/NewsControllers.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/api/news/last-news", getLastNews);
router.get("/api/news/details/:id", getNewsDetails);
router.get("/api/news/popular", popularNews);
router.get("/api/news/cat-news", getCatNews);


router.get("/api/news", verifyToken, getNews);
router.post("/api/news", verifyToken, createNews);
router.get("/api/news/:id", verifyToken, getNewsById);
router.put("/api/news/:id", verifyToken, updateNews);
router.delete("/api/news/:id", verifyToken, deleteNews);

export default router;