const Record = require('../models/Record');
const asyncHandler = require('../middleware/asyncHandler');

// @description   Get all user records
// @route         GET /api/v1/records/
// @access        Private
exports.getUserRecords = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const userRecords = await Record.findAll({ where: { userId } });
  res.status(200).json({
    success: true,
    data: userRecords,
  });
});

// @description   Get all records
// @route         GET /api/v1/records/explore
// @access        Private
exports.getAllRecords = asyncHandler(async (req, res) => {
  const records = await Record.findAll({ limit: 50 });
  res.status(200).json({
    success: true,
    data: records,
  });
});

// @description   Create a record
// @route         POST /api/v1/records/create
// @access        Private
exports.createRecord = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, description, latitude, longitude } = req.body;
  const imageUrl = 'reandom';
  await Record.create({
    title,
    description,
    userId,
    imageUrl,
    latitude,
    longitude,
  });
  res.status(200).json({
    success: true,
    msg: 'Record created',
  });
});
