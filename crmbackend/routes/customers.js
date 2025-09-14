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

// Base route: /api/customers
// Create a new customer (owned by logged-in user)
router.post("/", verifyToken, createCustomer);

// Get all customers for the logged-in user
router.get("/", verifyToken, getAllCustomers);

// Get a specific customer by ID (only if owned by logged-in user)
router.get("/:id", verifyToken, getCustomerById);

// Update a specific customer by ID (only if owned by logged-in user)
router.put("/:id", verifyToken, updateCustomer);

// Delete a specific customer by ID (only if owned by logged-in user)
router.delete("/:id", verifyToken, deleteCustomer);

export default router;
