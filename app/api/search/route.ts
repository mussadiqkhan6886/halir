import { connectDB } from "@/lib/config/db";
import Perfume from "@/lib/models/ProductSchema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectDB()

    const {searchParams} = new URL(req.url)
    const query = searchParams.get("q")

    if(!query) {
        return NextResponse.json({success: false, data: []}, {status: 400})
    }

    const products = await Perfume.find({
        $or: [
        {name: {$regex: query, $options: 'i'}},
        {categories: {$regex: query, $options: 'i'}}
    ]})

    return NextResponse.json({success:true, data: products}, {status: 200})


}