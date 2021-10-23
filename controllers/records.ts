import { Request, Response, NextFunction } from "express";

import Record from "../interfaces/Record";
import uploadImage from "../utils/uploadImage";
import ErrorResponse from "../interfaces/ErrorResponse";
import asyncHandler from "../middleware/asyncHandler";

// @description   Get all user records
// @route         GET /api/v1/records/
// @access        Private
export const getUserRecords = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const userRecords = await Record.findAll({ where: { userId } });
    res.status(200).json({
      success: true,
      data: userRecords,
    });
  }
);

// @description   Get all records
// @route         GET /api/v1/records/explore
// @access        Public
export const getAllRecords = asyncHandler(
  async (req: Request, res: Response) => {
    const records = await Record.findAll({ limit: 50 });
    res.status(200).json({
      success: true,
      data: records,
    });
  }
);

// @description   Create a record
// @route         POST /api/v1/records/create
// @access        Private
export const createRecord = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { title, description, latitude, longitude, imageUrl } = req.body;

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
      msg: "Record created",
    });
  }
);

// @description   Upload record image
// @route         POST /api/v1/records/upload-image
// @access        Private
export const uploadRecordImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const file: any = req.file;
    if (!req.file) {
      return next(new ErrorResponse("Please upload a file", 400));
    }
    // Make sure file is an image
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse("Please upload an image", 400));
    }
    const imageUrl = await uploadImage(file);
    res.status(200).json({
      success: true,
      msg: "Image uploaded",
      data: imageUrl,
    });
  }
);

// @description   Get record by id
// @route         GET /api/v1/records/:id
// @access        Public
export const getRecordById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const record = await Record.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        success: true,
        errors: ["Record not found"],
      });
    }
    res.status(200).json({
      success: true,
      data: record,
    });
  }
);

// @description   Update record by id
// @route         PUT /api/v1/records/:id
// @access        Private
export const updateRecordById = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const record = await Record.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        success: true,
        errors: ["Record not found"],
      });
    }
    if (record.userId !== req.user.id) {
      return res.status(401).json({
        success: false,
        errors: ["Not allowed to edit this record"],
      });
    }
    await record.update({ title, description });
    res.status(200).json({
      success: true,
      msg: "Record updated",
    });
  }
);

// @description   Delete record by id
// @route         DELETE /api/v1/records/:id
// @access        Private
export const deleteRecordById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const record = await Record.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        success: false,
        errors: ["Record not found"],
      });
    }
    if (record.userId !== req.user.id) {
      return res.status(401).json({
        success: false,
        errors: ["Not allowed to delete this record"],
      });
    }
    await record.destroy();
    res.status(200).json({
      success: true,
      msg: "Record deleted",
    });
  }
);
