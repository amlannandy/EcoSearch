import { Router } from "express";

import {
  verifyRecord,
  deleteRecord,
  verifyResearcher,
  deleteResearcher,
  getUnverifiedRecords,
  getUnverifiedResearchers,
} from "../controllers/admin";
import authHandler from "../middleware/authHandler";

const router = Router();

router.get("/records", authHandler, getUnverifiedRecords);

router.get("/researchers", authHandler, getUnverifiedResearchers);

router.put("/records/:id", authHandler, verifyRecord);

router.put("/researchers/:id", authHandler, verifyResearcher);

router.delete("/records/:id", authHandler, deleteRecord);

router.delete("/researchers/:id", authHandler, deleteResearcher);

export default router;
