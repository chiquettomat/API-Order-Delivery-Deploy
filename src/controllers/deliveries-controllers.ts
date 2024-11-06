import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/database/prisma";

class deliveriesControllers {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string(),
    });

    const { user_id, description } = bodySchema.parse(req.body);

    await prisma.delivery.create({
      data: {
        userId: user_id,
        description,
      },
    });
    return res.status(201).json({ message: "created" });
  }

  async index(req: Request, res: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return res.status(200).json(deliveries);
  }
}

export { deliveriesControllers };
