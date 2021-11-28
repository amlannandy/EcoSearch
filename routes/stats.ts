import { Router } from "express";

import { getObjectPath, getSpeciesinRadius } from "../controllers/stats";
import authHandler from "../middleware/authHandler";

const router = Router();

router.post("/object-path", authHandler, getObjectPath);

router.post("/species-radius", authHandler, getSpeciesinRadius);

export default router;
