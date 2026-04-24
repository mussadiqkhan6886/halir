import { uploadToCloudinary } from "@/helpers/uploadImage";
import { connectDB } from "@/lib/config/db";
import Perfume from "@/lib/models/ProductSchema";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (_req: NextRequest, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()
    const {id} = await params
    const product = await Perfume.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({message: "Product Found", product}, {status: 200})
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params
  try {
    await connectDB();

    const formData = await req.formData();

    const product = await Perfume.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // ── Basic fields ─────────────────────────────────────────
    const name        = formData.get('name') as string;
    const slug        = formData.get('slug') as string;
    const tagline     = formData.get('tagline') as string;
    const description = formData.get('description') as string;
    const gender      = formData.get('gender') as ('men' | 'women' | 'unisex');
    const longevity   = formData.get('longevity') as string;
    const categories  = JSON.parse(formData.get('categories') as string);

    product.name        = name;
    product.slug        = slug;
    product.tagline     = tagline;
    product.description = description;
    product.gender      = gender;
    product.longevity   = longevity;
    product.categories  = categories;

    // ── MAIN IMAGE ───────────────────────────────────────────
    const mainImageFile = formData.get('mainImage') as File | null;
    const mainImageUrl  = formData.get('mainImageUrl') as string;

    if (mainImageFile) {
      product.mainImage = await uploadToCloudinary(mainImageFile, 'halir');
    } else {
      product.mainImage = mainImageUrl; // keep old
    }

    // ── NOTES ────────────────────────────────────────────────
    const notesJson = JSON.parse(formData.get('notes') as string);

    const tiers = ['top', 'heart', 'base'] as const;

    const updatedNotes: any = {
      top: [],
      heart: [],
      base: [],
    };

    for (const tier of tiers) {
      for (let i = 0; i < notesJson[tier].length; i++) {
        const noteData = notesJson[tier][i];

        const file = formData.get(`note_${tier}_${i}`) as File | null;

        let imageUrl = noteData.existingUrl;

        if (file) {
          // new image uploaded
          imageUrl = await uploadToCloudinary(file, 'halir');
        }

        updatedNotes[tier].push({
          name: noteData.name,
          image: imageUrl || '',
        });
      }
    }

    product.notes = updatedNotes;

    // ── SAVE ────────────────────────────────────────────────
    await product.save();

    return NextResponse.json(
      { message: 'Product updated successfully' },
      { status: 200 }
    );

  } catch (err: any) {
    if (err.code === 11000) {
      return NextResponse.json(
        { message: 'Slug already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}


export const DELETE = async (_req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  await connectDB();
  const id = (await params).id;

  try {
    const deletedProduct = await Perfume.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product", error: error.message },
      { status: 500 }
    );
  }
};
