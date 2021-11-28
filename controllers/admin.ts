import { Request, Response } from "express";

import User from "../interfaces/User";
import Record from "../interfaces/Record";
import asyncHandler from "../middleware/asyncHandler";

// @description   Get unverified records
// @route         GET /api/v1/admin/records
// @access        Private - Admin
export const getUnverifiedRecords = asyncHandler(
  async (req: Request, res: Response) => {
    const records = await Record.findAll({ where: { isVerified: false } });
    res.status(200).json({
      success: true,
      data: records,
    });
  }
);

// @description   Get unverified researchers
// @route         GET /api/v1/admin/researchers
// @access        Private - Admin
export const getUnverifiedResearchers = asyncHandler(
  async (req: Request, res: Response) => {
    const users = await User.findAll({
      where: { isVerified: false, type: "researcher" },
    });
    res.status(200).json({
      success: true,
      data: users,
    });
  }
);

// @description   Verify record
// @route         GET /api/v1/admin/verify-record/:id
// @access        Private - Admin
export const verifyRecord = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const record = await Record.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        success: false,
        errors: ["Record not found"],
      });
    }
    await record.update({ isVerified: true });
    res.status(200).json({
      success: true,
      msg: "Record verified",
    });
  }
);

// @description   Verify researcher
// @route         GET /api/v1/admin/verify-researcher/:id
// @access        Private - Admin
export const verifyResearcher = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not record"],
      });
    }
    await user.update({ isVerified: true });
    res.status(200).json({
      success: true,
      msg: "User verified",
    });
  }
);

// @description   Delete a record
// @route         GET /api/v1/admin/delete-record/:id
// @access        Private - Admin
export const deleteRecord = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const record = await Record.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        success: false,
        errors: ["Record not found"],
      });
    }
    await record.destroy();
    res.status(200).json({
      success: true,
      msg: "Record deleted",
    });
  }
);

// @description   Delete a user
// @route         GET /api/v1/admin/delete-researcher/:id
// @access        Private - Admin
export const deleteResearcher = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id, type: "researcher" } });
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }
    await user.destroy();
    res.status(200).json({
      success: true,
      data: "User deleted",
    });
  }
);
