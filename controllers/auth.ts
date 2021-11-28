import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import User from "../interfaces/User";
import uploadImage from "../utils/uploadImage";
import RevokedToken from "../interfaces/RevokedToken";
import ErrorResponse from "../interfaces/ErrorResponse";
import asyncHandler from "../middleware/asyncHandler";
import { sendPasswordResetmail } from "../utils/sendMail";

// @description   Login user
// @route         POST /api/v1/auth/login
// @access        Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    attributes: { include: "password" } as any,
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ["Account with this email does not exist"],
    });
  }
  const authResult = await user.matchPassword(password);
  if (!authResult) {
    return res.status(401).json({
      success: false,
      errors: ["Incorrect Password"],
    });
  }
  const token = user.authToken;
  res.status(200).json({
    success: true,
    data: token,
  });
});

// @description   Register user
// @route         POST /api/v1/auth/register
// @access        Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, type = "user" } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      errors: ["Account with this email already exists"],
    });
  }
  const user = await User.create({
    name,
    email,
    password,
    type,
    isVerified: type === "user",
  });
  const token = user.authToken;
  res.status(200).json({
    success: true,
    data: token,
  });
});

// @description   Get logged in user
// @route         POST /api/v1/auth/current-user
// @access        Private
export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  await RevokedToken.create({ token });
  res.status(200).json({
    success: true,
    msg: "Logged out",
  });
});

// @description   Update password
// @route         PUT /api/v1/auth/update-password
// @access        Private
export const updatePassword = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findOne({
      where: { id: userId },
      attributes: { include: "password" } as any,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    const authResult = await user.matchPassword(currentPassword);
    if (!authResult) {
      return res.status(401).json({
        success: false,
        errors: ["Incorrect Password"],
      });
    }

    await user.update({ password: newPassword });
    res.status(200).json({
      success: true,
      msg: "Password updated",
    });
  }
);

// @description   Delete Account
// @route         PUT /api/v1/auth/delete-account
// @access        Private
export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.user.id;
    const password = req.body.password;
    const user = await User.findOne({
      where: { id },
      attributes: { include: "password" } as any,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    const authResult = await user.matchPassword(password);
    if (!authResult) {
      return res.status(401).json({
        success: false,
        errors: ["Incorrect Password"],
      });
    }

    await user.destroy();
    res.status(200).json({
      success: true,
      msg: "Account deleted",
    });
  }
);

// @description   Forgot password
// @route         PUT /api/v1/auth/forgot-password
// @access        Public
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["Account with this email does not exist"],
      });
    }

    const token = user.authToken;
    if (!token) {
      return res.status(403).json({
        success: false,
        errors: ["Error decoding token"],
      });
    }

    await sendPasswordResetmail(email, token);
    res.status(200).json({
      success: true,
      msg: "Reset mail sent. Please check your emails",
    });
  }
);

// @description   Update info
// @route         PUT /api/v1/auth/update-info
// @access        Private
export const updateInfo = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const name = req.body.name;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({
      success: false,
      errors: ["User not found"],
    });
  }

  await user.update({ name });

  res.status(200).json({
    success: true,
    msg: "Info updated",
  });
});

// @description   Reset password
// @route         PUT /api/v1/auth/reset-password
// @access        Public
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.params.token;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(401).json({
        success: false,
        errors: ["Error decoding token"],
      });
    }
    const decoded = jwt.verify(token, jwtSecret);
    const email = (decoded as any).id;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        errors: ["User with this email does not exist"],
      });
    }

    const password = req.body.password;
    await user.update({ password });
    res.status(200).json({
      success: true,
      msg: "Password reset",
    });
  }
);

// @description   Upload image
// @route         PUT /api/v1/auth/upload-image
// @access        Public
export const uploadProfileImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const file: any = req.file;
    if (!req.file) {
      return next(new ErrorResponse("Please upload a file", 400));
    }
    // Make sure file is an image
    if (!file.mimetype.startsWith("image")) {
      return next(new ErrorResponse("Please upload an image", 400));
    }

    const userId = req.user.id;
    const user = await User.findOne({ where: { id: userId } });
    const imageUrl = await uploadImage(file);

    if (!user) {
      return res.status(404).json({
        success: false,
        errors: ["User not found"],
      });
    }

    if (!imageUrl) {
      return res.status(404).json({
        success: false,
        errors: ["Error upload image"],
      });
    }

    await user.update({ imageUrl });

    res.status(200).json({
      success: true,
      msg: "Profile picture updated",
    });
  }
);
