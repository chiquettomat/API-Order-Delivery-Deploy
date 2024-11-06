import { Router } from "express";
import { sessionsController } from "@/controllers/sessions-controller";

const sessionsRoutes = Router();
const SessionsControllers = new sessionsController();

sessionsRoutes.post("/", SessionsControllers.create);

export { sessionsRoutes };
