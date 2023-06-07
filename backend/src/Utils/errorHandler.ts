import { Response } from "express";

export function errorHandler<T>(
  res: Response,
  status: number,
  message: string = "",
  options?: T
) {
  return res.status(status).json({ success: false, message, ...options });
}

export function successHandler<T>(
  res: Response,
  status: number,
  message: string = "",
  options?: T
) {
  return res.status(status).json({ success: true, message, ...options });
}
