import { Router } from "express";
import { deliveriesControllers } from "@/controllers/deliveries-controllers";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

import { verifyAuthorization } from "@/middlewares/verify-authorization";
import { deliveriesStatusController } from "@/controllers/deliveries-status-controller";

const deliveriesRoutes = Router();
const DeliveriesControllers = new deliveriesControllers();
const DeliveriesStatusController = new deliveriesStatusController();

deliveriesRoutes.use(ensureAuthenticated, verifyAuthorization(["seller"]));

deliveriesRoutes.post("/", DeliveriesControllers.create);
deliveriesRoutes.get("/", DeliveriesControllers.index);
deliveriesRoutes.patch("/:id/status", DeliveriesStatusController.update);

export { deliveriesRoutes };
