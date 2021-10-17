import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { DataTypes, Optional, Model } from "sequelize";

import { sequelize } from "../db";

const User = sequelize.define<IUserInstance>(
  "user",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: process.env.AVATAR_IMAGE_URL,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    getterMethods: {
      authToken() {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
          return null;
        }
        return jwt.sign({ id: (this as any).email }, jwtSecret, {
          expiresIn: process.env.JWT_EXPIRE,
        });
      },
    },
    hooks: {
      beforeCreate: async (user: any, options) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
      },
      beforeUpdate: async (user: any, options) => {
        if (user.changed().includes("password")) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(user.password, salt);
          user.password = hashedPassword;
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

User.prototype.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

interface IUserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  createdAt?: Date;
}

interface IUserAttributes extends Optional<IUserModel, "id"> {}

interface IUserInstance extends Model<IUserModel, IUserAttributes>, IUserModel {
  authToken: string;
  matchPassword: (password: string) => Promise<boolean>;
}

export default User;
