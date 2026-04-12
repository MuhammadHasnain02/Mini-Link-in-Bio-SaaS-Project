import { Router } from "express";
import multer from "multer";
import { createProfile, getProfile, updateProfile, uploadProfileImage } from "../controllers/profileController.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", createProfile);
router.get("/:username", getProfile);
router.put("/:username", updateProfile);
router.post("/:username/image", upload.single("image"), uploadProfileImage);

export default router;
