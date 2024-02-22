import express  from "express";
import { getAllReviews,createReview } from "../Controllers/reviewController.js";
import { authenticate,restrict } from "../auths/verifyToken.js";

const router = express.Router({mergeParams:true})

router.route('/', authenticate,).get(getAllReviews).post(createReview)

export default router;