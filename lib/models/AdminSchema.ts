import mongoose, { Schema } from "mongoose"

const AdminSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please Provide Username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpire: Date,
})

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema)

export default Admin
