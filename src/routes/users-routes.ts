import { Router } from "express";

import { usersControllers } from "@/controllers/users-controllers";

const usersRoutes = Router();
const UsersControllers = new usersControllers();

usersRoutes.post("/", UsersControllers.create);

export { usersRoutes };
