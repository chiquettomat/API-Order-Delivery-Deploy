import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/appError";

export function verifyAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError("unauthorized", 401);
    }

    if (!role.includes(req.user.role)) {
      throw new AppError("unauthorized", 401);
    }

    return next();
  };
}
