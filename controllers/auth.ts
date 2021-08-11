import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: 'Login route',
  });
};

export const register = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: 'Register route',
  });
};

export const getCurrentUser = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: 'Get current user route',
  });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    msg: 'Logout route',
  });
};
