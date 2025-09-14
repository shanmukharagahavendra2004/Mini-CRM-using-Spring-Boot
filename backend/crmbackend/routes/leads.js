import express from "express";
import {
  getAllLeads,
  getLeadsByCustomer,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getAllLeads);
router.get("/customer/:customerId", verifyToken, getLeadsByCustomer);
router.get("/:id", verifyToken, getLeadById);
router.post("/", verifyToken, createLead);
router.put("/:id", verifyToken, updateLead);
router.delete("/:id", verifyToken, deleteLead);

export default router;
