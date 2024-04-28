import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    clerkId: String,
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
