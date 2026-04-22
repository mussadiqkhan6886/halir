import { uploadToCloudinary } from '@/helpers/uploadImage';
import { connectDB } from '@/lib/config/db';
import Perfume from '@/lib/models/ProductSchema';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  try {
    await connectDB();
    const perfumes = await Perfume.find().lean();
    return NextResponse.json(perfumes, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// ── POST — create a new perfume ───────────────────────────────

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // ── Parse flat fields ─────────────────────────────────────
    const slug        = formData.get('slug')        as string;
    const name        = formData.get('name')        as string;
    const tagline     = formData.get('tagline')     as string;
    const description = formData.get('description') as string;
    const gender      = formData.get('gender')      as string;
    const longevity   = formData.get('longevity')   as string;
    const categories  = JSON.parse(formData.get('categories') as string) as string[];

    // ── Upload main image ─────────────────────────────────────
    const mainImageFile = formData.get('mainImage') as File | null;
    if (!mainImageFile) {
      return NextResponse.json({ message: 'Main image is required' }, { status: 400 });
    }
    const mainImage = await uploadToCloudinary(mainImageFile, 'halir');

    // ── Upload note images ────────────────────────────────────
    const notesJson = JSON.parse(formData.get('notes') as string) as {
      top:   { name: string }[];
      heart: { name: string }[];
      base:  { name: string }[];
    };

    const tiers = ['top', 'heart', 'base'] as const;

    const notes: Record<string, { name: string; image: string }[]> = {
      top: [], heart: [], base: [],
    };

    for (const tier of tiers) {
      for (let i = 0; i < notesJson[tier].length; i++) {
        const file  = formData.get(`note_${tier}_${i}`) as File | null;
        const image = file
          ? await uploadToCloudinary(file, `halir`)
          : '';
        notes[tier].push({ name: notesJson[tier][i].name, image });
      }
    }

    // ── Upload size images ────────────────────────────────────
    const sizesJson = JSON.parse(formData.get('sizes') as string) as {
      slug: string; label: string; ml: number; price: number;
      onSale: boolean; salePrice: number | null;
      sku: string; in_stock: boolean; stock: number;
    }[];

    const sizes = await Promise.all(
      sizesJson.map(async (sizeData, si) => {
        const images: string[] = [];
        let ii = 0;

        // Collect all images for this size
        while (true) {
          const file = formData.get(`size_${si}_image_${ii}`) as File | null;
          if (!file) break;
          const url = await uploadToCloudinary(file, `halir`);
          images.push(url);
          ii++;
        }

        return { ...sizeData, images };
      })
    );

    // ── Save to MongoDB ───────────────────────────────────────
    const perfume = await Perfume.create({
      slug, name, tagline, description, gender,
      longevity, categories, mainImage, notes, sizes,
    });

    return NextResponse.json(perfume, { status: 201 });

  } catch (err: any) {
    // Duplicate slug
    if (err.code === 11000) {
      return NextResponse.json(
        { message: 'A perfume with this slug already exists' },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}