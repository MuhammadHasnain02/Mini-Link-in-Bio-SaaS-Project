import { Router } from "express";
import { createProfile, getProfile, updateProfile } from "../controllers/profileController.js";

const router = Router();

router.post("/", createProfile);
router.get("/:username", getProfile);
router.put("/:username", updateProfile);

export default router;
