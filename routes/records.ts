import { Router } from "express";

import {
  getUserRecords,
  createRecord,
  uploadRecordImage,
  getAllRecords,
  getRecordById,
  updateRecordById,
  deleteRecordById,
} from "../controllers/records";
import {
  validateCreateRecord,
  validateEditRecord,
} from "../validators/records";
import multerUploads from "../middleware/multer";
import authHandler from "../middleware/authHandler";

const router = Router();

router.get("/", authHandler, getUserRecords);

router.get("/explore", getAllRecords);

router.post(
  "/create",
  [authHandler, validateCreateRecord as any],
  createRecord
);

router.post("/upload-image", [authHandler, multerUploads], uploadRecordImage);

router
  .route("/:id")
  .get(getRecordById)
  .put([authHandler, validateEditRecord as any], updateRecordById)
  .delete(authHandler, deleteRecordById);

export default router;
