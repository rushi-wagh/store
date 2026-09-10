import express from "express";
import { changePassword, getMe, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",isLoggedIn,logoutUser);
router.get("/",isLoggedIn,getMe);
router.patch("/update-password",isLoggedIn,changePassword);

export default router;