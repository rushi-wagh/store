import express from "express";
import { getAllUsers,addUser } from "../controllers/admin.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users",isLoggedIn,isAdmin,getAllUsers);
router.post("/users",isLoggedIn,isAdmin,addUser);

export default router;