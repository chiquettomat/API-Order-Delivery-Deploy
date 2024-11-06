import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyAuthorization } from "@/middlewares/verify-authorization";
import { deliveryLogsController } from "@/controllers/delivery-logs-controller";

const deliveryLogsRoutes = Router();
const DeliveryLogsController = new deliveryLogsController();

deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyAuthorization(["seller"]),
  DeliveryLogsController.create
);

deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyAuthorization(["seller", "costumer"]),
  DeliveryLogsController.show
);

export { deliveryLogsRoutes };
