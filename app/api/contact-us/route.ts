import { transporter } from "@/helpers/CloudinaryConnect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try{
        const { name, email, message} = await req.json()

        if(!name || !email || !message) {
            return NextResponse.json({success: false, message: "Name,  Email and message is required"}, {status: 400})
        }

        await transporter.sendMail({
            from: "Halir Contact Form",
            to: "halirperfumery@gmail.com",
            subject: `New Enquiry from ${name}`,
            html: `
                <div style="font-family: Arial; padding: 10px;">
                <h2>New Contact Form Submission</h2>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b></p>
                <p>${message}</p>
                </div>
            `,
        })
        return NextResponse.json({
        success: true,
        message: "Email sent successfully",
        })

    } catch (error: any) {
        console.error("Email error:", error)

        return NextResponse.json(
        { success: false, message: "Failed to send email" },
        { status: 500 }
        )
    }
}