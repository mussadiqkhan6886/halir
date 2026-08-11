import { transporter } from "@/helpers/CloudinaryConnect";
import { uploadToCloudinary } from "@/helpers/uploadImage";
import { connectDB } from "@/lib/config/db";
import order from "@/lib/models/OrderSchema";
import Perfume from "@/lib/models/ProductSchema";
import { OrderType } from "@/type";
import { NextRequest, NextResponse } from "next/server";

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

            await Perfume.updateOne(
                {
                    "sizes.sku": item.sku,
                    "sizes.stock": { $gte: item.quantity }
                },
                {
                    $inc: { "sizes.$.stock": -item.quantity }
                }
            );
        }
    }

    const generateAdminEmail = (newOrder: OrderType) => {
        const itemsHtml = newOrder.items.map(item => `
            <tr>
            <td style="padding:10px;border:1px solid #eee;">
                <img src="${item.image}" width="50" style="border-radius:6px;" />
            </td>
            <td style="padding:10px;border:1px solid #eee;">
                ${item.name} <br/>
                <small>Size: ${item.selectedSize}</small><br/>
                <small>SKU: ${item.sku}</small>
            </td>
            <td style="padding:10px;border:1px solid #eee;">${item.quantity}</td>
            <td style="padding:10px;border:1px solid #eee;">
                Rs ${item.onSale ? item.salePrice : item.price}
            </td>
            </tr>
        `).join("");

        return `
        <div style="font-family:Arial,sans-serif;background:#f6f6f6;padding:20px;">
            <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">
            
            <div style="background:#111;color:#fff;padding:20px;text-align:center;">
                <h2>🛒 New Order Received</h2>
            </div>

            <div style="padding:20px;">
                <p><strong>Order ID:</strong> ${newOrder.orderId.slice(0,7)}</p>
                <p><strong>Customer:</strong> ${newOrder.userDetails.fullName}</p>
                <p><strong>Phone:</strong> ${newOrder.userDetails.phone}</p>
                <p><strong>Email:</strong> ${newOrder.userDetails.email}</p>

                <h3>Items</h3>
                <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f2f2f2;">
                    <th style="padding:10px;border:1px solid #eee;">Image</th>
                    <th style="padding:10px;border:1px solid #eee;">Product</th>
                    <th style="padding:10px;border:1px solid #eee;">Qty</th>
                    <th style="padding:10px;border:1px solid #eee;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
                </table>

                <h3>Total: Rs ${newOrder.totalPrice}</h3>

                <p><strong>Address:</strong><br/>
                ${newOrder.shippingAddress.address}, ${newOrder.shippingAddress.city}</p>

                <p><strong>Payment:</strong> ${newOrder.paymentMethod.toUpperCase()}</p>

                <div style="text-align:center;margin-top:20px;">
                <a href="https://halirperfumerypk.com/admin-dashboard"
                    style="background:#111;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;">
                    View Dashboard
                </a>
                </div>
            </div>
            </div>
        </div>
        `;
        };

    const generateCustomerEmail = (newOrder: OrderType) => {
        const itemsHtml = newOrder.items.map(item => `
            <tr>
            <td style="padding:10px;border:1px solid #eee;">
                ${item.name} (${item.selectedSize} ml)
            </td>
            <td style="padding:10px;border:1px solid #eee;">${item.quantity}</td>
            <td style="padding:10px;border:1px solid #eee;">
                Rs ${item.onSale ? item.salePrice : item.price}
            </td>
            </tr>
        `).join("");

        return `
        <div style="font-family:Arial,sans-serif;background:#f6f6f6;padding:20px;">
            <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">
            
            <div style="background:#111;color:#fff;padding:20px;text-align:center;">
                <h2>Order Confirmed</h2>
            </div>

            <div style="padding:20px;">
                <p>Hi ${newOrder.userDetails.fullName},</p>
                <p>Your order has been placed successfully</p>

                <p><strong>Order ID:</strong> ${newOrder.orderId.slice(0,7)}</p>

                <h3>Order Summary</h3>
                <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                <thead>
                    <tr style="background:#f2f2f2;">
                    <th style="padding:10px;border:1px solid #eee;">Product</th>
                    <th style="padding:10px;border:1px solid #eee;">Qty</th>
                    <th style="padding:10px;border:1px solid #eee;">Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                </tbody>
                </table>

                <h3>Total: Rs ${newOrder.totalPrice}</h3>

                <p>We will contact you soon for delivery</p>

                <p style="margin-top:20px;">Thanks for shopping with us</p>
            </div>
            </div>
        </div>
        `;
        };

    const sendOrderEmails = async (newOrder: OrderType) => {
        try {
            // Admin email
            await transporter.sendMail({
            from: `"Halir" <${process.env.EMAIL_USER}>`,
            to: "halirperfumery@gmail.com",
            subject: `New Order - ${newOrder.orderId.slice(0, 7)}`,
            html: generateAdminEmail(newOrder),
            });

            // Customer email
            await transporter.sendMail({
            from: `"Halir" <${process.env.EMAIL_USER}>`,
            to: newOrder.userDetails.email,
            subject: `Order Confirmed - ${newOrder.orderId.slice(0,7)}`,
            html: generateCustomerEmail(newOrder),
            });

        } catch (error) {
            console.error("Email Error:", error);
        }
    };

    sendOrderEmails(newOrder)

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

