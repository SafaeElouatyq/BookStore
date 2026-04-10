import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/my-orders/:keycloakId", getMyOrders);
router.get("/", getAllOrders);

export default router;