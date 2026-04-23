import { uploadToCloudinary } from "@/helpers/uploadImage";
import { connectDB } from "@/lib/config/db";
import order from "@/lib/models/OrderSchema";
import Perfume from "@/lib/models/ProductSchema";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();

    const orders = await order.find({})

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders." },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const formData = await req.formData();
    const orderData = JSON.parse(formData.get("orderData") as string);
    const paymentProofFile = formData.get("paymentProof") as File | null;

    const uploadedImages : string[] = []

    if (paymentProofFile && typeof paymentProofFile === "object") {
        const uploadResult = await uploadToCloudinary(paymentProofFile, "halir")
        
        uploadedImages.push(uploadResult);
    }


    const newOrder = await order.create({
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      userDetails: orderData.userDetails,
      notes: orderData.notes,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentProof: uploadedImages[0] || null,
      createdAt: new Date(),
    });


    for (const item of orderData.items) {
        const product = await Perfume.findOne(
            { "sizes.sku": item.sku },
            { sizes: { $elemMatch: { sku: item.sku } } }
        );

        if (product && product.sizes.length > 0) {
            const size = product.sizes[0];

            let newStock = size.stock - item.quantity;
            if (newStock < 0) newStock = 0;

            await Perfume.updateOne(
            { "sizes.sku": item.sku },
            {
                $set: {
                "sizes.$.stock": newStock,
                "sizes.$.inStock": newStock > 0
                }
            }
            );
        }
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const html = `
      <h2>New Order Received!</h2>
      <a href="https://halir-seven.vercel.app/admin-dashboard">Check it out</a>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "mussadiqkhan6886@gmail.com", // admin email
      subject: `New Order`,
      html,
    };

    // 4️⃣ Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order." },
      { status: 500 }
    );
  }
};

