import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";
import { ZodError } from "zod";

export function errorHandling(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(err.message);
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation error",
      issues: err.format(),
    });
  }

  return res.status(500).json({ message: err.message });
}
