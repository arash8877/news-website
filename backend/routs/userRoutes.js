import express from "express";
import { getAllUsers, Register, Login, Logout, deleteUser, updateUser, updateProfile, Profile } from "../controllers/userController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();
router.get("/token", refreshToken)

router.get("/api/users", verifyToken, getAllUsers);
router.post("/api/users/register", Register);
router.post("/api/users/login", Login);
router.get("/api/users/profile", verifyToken, Profile);
router.put("/api/users/profile/:id", verifyToken, updateProfile);
router.put("/api/users/:id", verifyToken , updateUser);
router.delete("/api/users/:id", verifyToken, deleteUser);
router.delete("/api/users/logout", verifyToken, Logout);

export default router;

