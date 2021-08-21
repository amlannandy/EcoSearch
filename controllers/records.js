const Record = require('../models/Record');
const asyncHandler = require('../middleware/asyncHandler');

// @description   Create a record
// @route         POST /api/v1/records/create
// @access        Private
exports.createRecord = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { title, description } = req.body;
  const imageUrl = 'reandom';
  await Record.create({ title, description, userId, imageUrl });
  res.status(200).json({
    success: true,
    msg: 'Record created',
  });
});
