import express from "express";
import GigController from "../controllers/GigController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";

const router = express.Router();

router.post("/", AuthMiddleware ,GigController.create)
router.put("/:id",AuthMiddleware , GigController.update)
router.get("/:id/check", AuthMiddleware, GigController.chechGigOrder)
router.get("/", GigController.getALl)
router.get("/:id", GigController.getOne)
router.get("/add-review", AuthMiddleware,GigController.addReview)
router.get("/user",AuthMiddleware, GigController.userAuthGig)
router.delete("/:id", AuthMiddleware, GigController.delete)

export default router;