const { Router } = require('express');

const {
  getUserRecords,
  createRecord,
  uploadRecordImage,
  getAllRecords,
  getRecordById,
  updateRecordById,
  deleteRecordById,
} = require('../controllers/records');
const {
  validateCreateRecord,
  validateEditRecord,
} = require('../validators/records');
const multerUploads = require('../middleware/multer');
const authHandler = require('../middleware/authHandler');

const router = Router();

router.get('/', authHandler, getUserRecords);

router.get('/explore', getAllRecords);

router.post('/create', [authHandler, validateCreateRecord], createRecord);

router.post('/upload-image', [authHandler, multerUploads], uploadRecordImage);

router
  .route('/:id')
  .get(getRecordById)
  .put([authHandler, validateEditRecord], updateRecordById)
  .delete(authHandler, deleteRecordById);

module.exports = router;
