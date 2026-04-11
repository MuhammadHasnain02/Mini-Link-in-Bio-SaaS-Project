import { Router } from "express";
import { createProfile, getProfile } from "../controllers/profileController.js";

const router = Router();

router.post("/", createProfile);
router.get("/:username", getProfile);

export default router;
