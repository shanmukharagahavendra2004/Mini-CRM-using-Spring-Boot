import mongoose from "mongoose";
import Lead from "../models/lead.js";

export const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while fetching leads" });
  }
};

export const getLeadsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.params;
    const leads = await Lead.find({
      customerId: new mongoose.Types.ObjectId(customerId.trim())
    });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while fetching leads" });
  }
};

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while fetching lead" });
  }
};

export const createLead = async (req, res) => {
  try {
    const { customerId, title, description, status, value } = req.body;
    const validStatuses = ["New", "Contacted", "Qualified", "Lost"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const newLead = new Lead({
      customerId: new mongoose.Types.ObjectId(customerId.trim()),
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

export const updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLead) return res.status(404).json({ message: "Lead not found" });
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: err.message || "Error updating lead" });
  }
};

export const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ message: "Lead not found" });
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error while deleting lead" });
  }
};
