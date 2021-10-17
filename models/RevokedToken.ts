import { DataTypes } from "sequelize";

import { sequelize } from "../db";

const RevokedToken = sequelize.define("revoked_token", {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default RevokedToken;
