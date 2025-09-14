import Customer from "../models/customer.js";


export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer({
      ...req.body,
      ownerId: req.user.id, // Attach the logged-in user's ID
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message || "Error creating customer" });
  }
};


export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ ownerId: req.user.id });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching customers" });
  }
};


export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message || "Error fetching customer" });
  }
};


export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message || "Error updating customer" });
  }
};


export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, ownerId: req.user.id });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error deleting customer" });
  }
};
