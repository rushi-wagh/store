import express from "express";
import{ getStoreOwnerDashboard } from "../controllers/store.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();    

router.get("/dashboard",isLoggedIn,getStoreOwnerDashboard);

export default router;

