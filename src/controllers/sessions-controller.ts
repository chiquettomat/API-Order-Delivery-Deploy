import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import z from "zod";
import { AppError } from "@/utils/appError";
import { compare } from "bcrypt";

import { authConfig } from "@/configs/auth";

import { sign } from "jsonwebtoken";

class sessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("invalid email or password", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("invalid email or password");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role ?? "costumer" }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: hashedPassword, ...userWithoutPassword } = user;

    return res.status(201).json({ token, user: userWithoutPassword });
  }
}

export { sessionsController };
