import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
    updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/my-orders/:keycloakId", getMyOrders);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);

export default router;