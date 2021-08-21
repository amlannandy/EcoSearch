const { Router } = require('express');

const { createRecord } = require('../controllers/records');
const { validateCreateRecord } = require('../validators/records');
const authHandler = require('../middleware/authHandler');

const router = Router();

router.post('/create', [authHandler, validateCreateRecord], createRecord);

module.exports = router;
