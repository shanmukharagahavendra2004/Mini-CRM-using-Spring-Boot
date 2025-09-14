import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["New", "Contacted", "Qualified", "Lost"], default: "New" },
  value: { type: Number }
}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);
