import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const OrderSchema = new Schema({
 orderId: { type: String, default: () => uuidv4(), unique: true },
    items: [
      {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      onSale: {
        type: Boolean,
        default: false,
      },
      salePrice: {
        type: Number,
        default: null,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      image: {
        type: String,
        required: true,
      },
      selectedSize: {
        type: String,
        required: true,
      },
      sku: {
        type: String,
        required: true
      },
      personlized: {
        type: String
      }
    }
    ],
    totalPrice: { type: Number, required: true },
    userDetails: {
      fullName: {type: String, required: true},
      phone: {type: String, required: true},
      email: {type: String, required: true}
    },
    notes: {type: String},
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    shippingAddress: {
      city: { type: String },
      postalCode: { type: String },
      address: {type: String, required: true}
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "easypaisa"],
      default: "cod"
    },
    paymentProof: {
      type: String,
      required: function(){
        return this.paymentMethod !== "cod"
      } 
    }
  },
  { timestamps: true }
)

const order = mongoose.models.Order || mongoose.model("Order", OrderSchema)

export default order