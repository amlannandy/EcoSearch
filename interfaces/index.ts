import User from "./User";
import Record from "./Record";
import RevokedToken from "./RevokedToken";

export const createTables = async () => {
  User.hasMany(Record, { onDelete: "cascade" });
  Record.belongsTo(User);
  await User.sync();
  await RevokedToken.sync();
  await Record.sync();
};
