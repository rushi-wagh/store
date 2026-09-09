import express from "express";
import { getAllUsers,addUser,getUser,getStores,addStore } from "../controllers/admin.controller.js";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users",isLoggedIn,isAdmin,getAllUsers);
router.post("/users",isLoggedIn,isAdmin,addUser);
router.get("/user/:id",isLoggedIn,isAdmin,getUser);
router.post("/stores",isLoggedIn,isAdmin,addStore);
router.get("/stores",isLoggedIn,isAdmin,getStores);

export default router;