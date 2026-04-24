import { connectDB } from '@/lib/config/db';
import Perfume from '@/lib/models/ProductSchema';
import { uploadToCloudinary } from '@/helpers/uploadImage';
import { NextRequest, NextResponse } from 'next/server';

const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const toSku = (name: string, label: string) => {
  const prefix = name
    .split(' ')
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 3);

  const suffix = label.replace(/\s+/g, '').toUpperCase().slice(0, 6);

  return `HA-${prefix}-${suffix}`;
};

// ── PUT ─────────────────────────────────────────

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; slug: string }> }
) {
  try {
    await connectDB();

    const formData = await req.formData();
    const { id, slug } = await params;

    const product = await Perfume.findById(id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const size = product.sizes.find((s: any) => s.slug === slug);

    if (!size) {
      return NextResponse.json({ message: 'Size not found' }, { status: 404 });
    }

    // ── form values ─────────────────────────────

    const label = String(formData.get('label') || '');
    const ml = Number(formData.get('ml') || 0);
    const price = Number(formData.get('price') || 0);
    const salePrice = Number(formData.get('salePrice') || 0);
    const stock = Number(formData.get('stock') || 0);
    const onSale = JSON.parse(String(formData.get('onSale') || 'false'));

    // ── slug + sku FIX (IMPORTANT) ──────────────
    const newSlug = `${product.slug}-${toSlug(label)}`;
    const newSku = toSku(product.name, label);

    // ── update fields ───────────────────────────
    size.label = label;
    size.ml = ml;
    size.price = price;
    size.salePrice = salePrice;
    size.onSale = onSale;
    size.stock = stock;

    size.slug = newSlug;   // ✅ FIXED
    size.sku = newSku;     // ✅ ADDED

    // ── existing images ─────────────────────────
    let existingImages: string[] = [];

    try {
      existingImages = JSON.parse(
        String(formData.get('existingImages') || '[]')
      );
    } catch {
      existingImages = [];
    }

    // ── new images upload ───────────────────────
    const newImages: string[] = [];

    let i = 0;
    while (true) {
      const file = formData.get(`image_${i}`) as File | null;
      if (!file) break;

      const url = await uploadToCloudinary(file, 'halir');
      newImages.push(url);
      i++;
    }

    size.images = [...existingImages, ...newImages];

    await product.save();

    return NextResponse.json(
      {
        message: 'Size updated successfully',
        updatedSlug: newSlug,
        sku: newSku,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
}

export const DELETE = async (_req: NextRequest, {params}: {params: Promise<{id: string, slug: string}>}) => {
  const {id, slug} = await params

  await connectDB()

  const product = await Perfume.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    await Perfume.updateOne(
      { _id: id },
      {
        $pull: {
          sizes: { slug: slug }
        }
      }
    );

    return NextResponse.json(
      { success: true, message: "Size deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
}