import { Router } from "express";
import {
  createLink,
  getLinks,
  updateLink,
  toggleLink,
  trackClick,
  deleteLink
} from "../controllers/linkController.js";

const router = Router();

router.post("/", createLink);
router.get("/:profileId", getLinks);
router.put("/:id", updateLink);
router.patch("/:id/toggle", toggleLink);
router.patch("/:id/click", trackClick);
router.delete("/:id", deleteLink);

export default router;
