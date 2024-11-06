import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/database/prisma";

describe("users controller", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({
      where: { id: user_id },
    });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "test user",
      email: "testuser@email.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("test user");

    user_id = response.body.id;
  });

  it("should not create a new user with an existing email", async () => {
    const response = await request(app).post("/users").send({
      name: "duplicate user",
      email: "testuser@email.com",
      password: "password123",
    });

    expect(response.status).toBe(409);
    expect(response.body).toBe("User with this email already exists");
  });

  it("should throw a validation if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "test user",
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });
});
