import express from "express";
import { addRating, getRatingsForStore, updateRating } from "../controllers/rating.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/",isLoggedIn,addRating);
router.get("/:storeId",isLoggedIn,getRatingsForStore);
router.put("/:ratingId",isLoggedIn,updateRating);

export default router;