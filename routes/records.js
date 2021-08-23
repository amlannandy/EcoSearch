const { Router } = require('express');

const {
  getUserRecords,
  createRecord,
  uploadRecordImage,
} = require('../controllers/records');
const { validateCreateRecord } = require('../validators/records');
const multerUploads = require('../middleware/multer');
const authHandler = require('../middleware/authHandler');

const router = Router();

router.get('/', authHandler, getUserRecords);

router.post('/create', [authHandler, validateCreateRecord], createRecord);

router.post('/upload-image', [authHandler, multerUploads], uploadRecordImage);

module.exports = router;
