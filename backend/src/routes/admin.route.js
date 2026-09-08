import express from "express";
import { getAllUsers } from "../controllers/admin.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users",isLoggedIn,isAdmin,getAllUsers);

export default router;