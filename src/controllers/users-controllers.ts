import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import z from "zod";
import { hash } from "bcrypt";

import { AppError } from "@/utils/appError";

class usersControllers {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("User with this email already exists", 409);
    }

    const cryptoPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: cryptoPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword);
  }
}

export { usersControllers };
