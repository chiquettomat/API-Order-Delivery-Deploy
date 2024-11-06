import { Request, Response } from "express";
import z from "zod";
import { prisma } from "@/database/prisma";

class deliveriesStatusController {
  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"]),
    });

    const { id } = paramsSchema.parse(req.params);
    const { status } = bodySchema.parse(req.body);

    await prisma.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    await prisma.deliveryLog.create({
      data: {
        deliveryID: id,
        description: status,
      },
    });

    return res.status(200).json({ message: "updated" });
  }
}

export { deliveriesStatusController };
