import mongoose from "mongoose";
import Lead from "../models/lead.js";
import Customer from "../models/customer.js";

// GET all leads for current user's customers
export const getAllLeads = async (req, res) => {
  try {
    const ownerId = req.user.id;

    // Get all customer IDs for this user
    const userCustomers = await Customer.find({ ownerId }).select("_id");
    const customerIds = userCustomers.map(c => c._id);

    // Fetch leads for these customers
    const leads = await Lead.find({ customerId: { $in: customerIds } });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while fetching leads" });
  }
};

// GET leads by customer (only if customer belongs to user)
export const getLeadsByCustomer = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { customerId } = req.params;

    // Check if customer belongs to user
    const customer = await Customer.findOne({
      _id: new mongoose.Types.ObjectId(customerId.trim()),
      ownerId
    });

    if (!customer) return res.status(403).json({ message: "Unauthorized access to customer leads" });

    const leads = await Lead.find({ customerId: customer._id });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while fetching leads" });
  }
};

// GET lead by ID (only if lead belongs to user's customer)
export const getLeadById = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // Check ownership
    const customer = await Customer.findOne({ _id: lead.customerId, ownerId });
    if (!customer) return res.status(403).json({ message: "Unauthorized access to this lead" });

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while fetching lead" });
  }
};

// CREATE lead (only for user's customer)
export const createLead = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { customerId, title, description, status, value } = req.body;

    // Check if customer belongs to user
    const customer = await Customer.findOne({
      _id: new mongoose.Types.ObjectId(customerId.trim()),
      ownerId
    });
    if (!customer) return res.status(403).json({ message: "Cannot add lead to this customer" });

    const validStatuses = ["New", "Contacted", "Qualified", "Lost"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const newLead = new Lead({
      customerId: customer._id,
      title,
      description,
      status,
      value
    });

    await newLead.save();
    res.status(201).json(newLead);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error creating lead" });
  }
};

// UPDATE lead (only if lead belongs to user's customer)
export const updateLead = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // Check ownership
    const customer = await Customer.findOne({ _id: lead.customerId, ownerId });
    if (!customer) return res.status(403).json({ message: "Unauthorized access to update this lead" });

    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error updating lead" });
  }
};

// DELETE lead (only if lead belongs to user's customer)
export const deleteLead = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // Check ownership
    const customer = await Customer.findOne({ _id: lead.customerId, ownerId });
    if (!customer) return res.status(403).json({ message: "Unauthorized access to delete this lead" });

    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while deleting lead" });
  }
};
