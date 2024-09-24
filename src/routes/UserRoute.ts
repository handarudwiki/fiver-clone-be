import express from "express";
import UserController from "../controllers/UserController";

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", UserController.me);
router.put("/update", UserController.update);

export default router;