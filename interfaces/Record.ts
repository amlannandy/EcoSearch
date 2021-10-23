import { DataTypes, Optional, Model } from "sequelize";

import { sequelize } from "../db";

const Record = sequelize.define<IUserInstance>("record", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

interface IRecordModel {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  label: string;
  latitude: number;
  longitude: number;
  createdAt?: Date;
  userId?: number;
}

interface IRecordAttributes extends Optional<IRecordModel, "id"> {}

interface IUserInstance
  extends Model<IRecordModel, IRecordAttributes>,
    IRecordModel {}

export default Record;
