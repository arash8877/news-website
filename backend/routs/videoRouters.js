import express from "express";
import { verifyToken } from "../middleware/VerifyToken";
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getSingleVideo,
} from "../controllers/VideoController.js";

const router = express.Router();

router.post("/api/create-video", verifyToken, createVideo);
router.get("/api/get-videos", verifyToken, getAllVideos);
router.get("/api/single-video", getSingleVideo); //I don't use verifyToken as I want to show this video in the main page of the website
router.delete("/api/delete-video/:id", verifyToken, deleteVideo);

export default router;