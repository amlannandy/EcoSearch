const User = require('./User');
const Record = require('./Record');
const RevokedToken = require('./RevokedToken');

exports.createTables = async () => {
  User.hasMany(Record, { onDelete: 'cascade' });
  Record.belongsTo(User);
  await User.sync();
  await RevokedToken.sync();
  await Record.sync();
};
