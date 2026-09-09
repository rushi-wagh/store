import express from "express";
import{ getStoreOwnerDashboard,searchStores,sortStores } from "../controllers/store.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();    

router.get("/dashboard",isLoggedIn,getStoreOwnerDashboard);
router.get("/search", isLoggedIn, searchStores);
router.get("/sort", isLoggedIn, sortStores);

export default router;

