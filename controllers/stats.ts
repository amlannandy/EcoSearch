import { Request, Response } from "express";

import Record from "../interfaces/Record";
import asyncHandler from "../middleware/asyncHandler";

// @description   Get top 5 species in radius
// @route         GET /api/v1/stats/
// @access        Public
export const getSpeciesinRadius = asyncHandler(
  async (req: Request, res: Response) => {
    const filteredRecords = await Record.count({
      attributes: ["label"],
      group: ["label"],
    });
    res.status(200).json({
      success: true,
      data: filteredRecords,
    });
  }
);

// @description   Get opject path of a species
// @route         GET /api/v1/stats/object-path
// @access        Public
export const getObjectPath = asyncHandler(
  async (req: Request, res: Response) => {
    const { label } = req.body;
    const filteredRecords = await Record.findAll({ where: { label } });
    res.status(200).json({
      success: true,
      data: filteredRecords,
    });
  }
);
