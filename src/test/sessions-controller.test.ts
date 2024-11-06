import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("sessions controller", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should authenticate and get access token", async () => {
    const userResponse = await request(app).post("/users").send({
      name: " Auth test user",
      email: "authtestuser@email.com",
      password: "password123",
    });

    user_id = userResponse.body.id;

    const sessionResponse = await request(app).post("/sessions").send({
      email: "authtestuser@email.com",
      password: "password123",
    });

    expect(sessionResponse.status).toBe(201);
    expect(sessionResponse.body.token).toEqual(expect.any(String));
  });
});
