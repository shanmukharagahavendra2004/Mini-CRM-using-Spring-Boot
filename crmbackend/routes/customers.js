import express from "express";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createCustomer);
router.get("/", verifyToken, getAllCustomers);
router.get("/:id", verifyToken, getCustomerById);
router.put("/:id", verifyToken, updateCustomer);
router.delete("/:id", verifyToken, deleteCustomer);

export default router;
