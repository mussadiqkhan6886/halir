import { connectDB } from '@/lib/config/db';
import Perfume from '@/lib/models/ProductSchema';
import { uploadToCloudinary } from '@/helpers/uploadImage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;
  const formData = await req.formData();

  const product = await Perfume.findById(id);
  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const newSize: any = {
    label: formData.get("label"),
    ml: formData.get("ml"),
    price: formData.get("price"),
    salePrice: formData.get("salePrice"),
    onSale: JSON.parse(formData.get("onSale") as string),
    stock: formData.get("stock"),
    slug: formData.get("slug"),
    sku: formData.get("sku"),
    images: [],
  };

  // upload images
  let i = 0;
  while (true) {
    const file = formData.get(`image_${i}`) as File | null;
    if (!file) break;

    const url = await uploadToCloudinary(file, "halir");
    newSize.images.push(url);

    i++;
  }

  product.sizes.push(newSize);

  await product.save();

  return NextResponse.json({ message: "Size added" });
}